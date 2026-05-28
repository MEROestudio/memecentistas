import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Increase limit to handle screenshot uploads
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ limit: "15mb", extended: true }));

let aiClient: GoogleGenAI | null = null;

// Lazy initialization of GoogleGenAI
function getGenAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("La variable GEMINI_API_KEY no está configurada. Puedes añadirla en Configuración > Secretos.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// 1. Analyze Instagram Insights screenshots
app.post("/api/analyze-screenshot", async (req, res) => {
  try {
    const { image, mimeType } = req.body;
    if (!image || !mimeType) {
      res.status(400).json({ error: "Faltan los datos de la imagen o el tipo MIME." });
      return;
    }

    const ai = getGenAI();

    const imagePart = {
      inlineData: {
        mimeType,
        data: image // Base64 string directly
      }
    };

    const prompt = `Analiza esta captura de pantalla que muestra estadísticas oficiales de Instagram Insights o la pantalla de perfil principal del usuario.
Extrae todos los números, nombres de ciudades/países, porcentajes de género, grupos de edad, interacciones en publicaciones, o información del perfil (como el nombre comercial o MEMECENTISTAS®, biografía bio, número de publicaciones/posts y seguidos) que identifiques.
Devuélvelos de forma estructurada según el esquema de respuesta solicitado.
Sé extremadamente preciso. Si un campo no está presente en la captura, no inventes datos para él.
En "summaryText", escribe una breve explicación en español sobre lo que pudiste leer en esta imagen concreta. En el caso de una captura de perfil, destaca el lema, bio y número de seguidores o publicaciones detectados.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [imagePart, prompt],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            detectedMetricType: { 
              type: Type.STRING, 
              description: "Tipo de datos: 'profile' (info de biografía y seguidores), 'overall' (alcance, seguidores, visitas), 'demographic' (público, edad, país), 'posts' (publicaciones e interacciones), o 'unknown'" 
            },
            accountName: { type: Type.STRING, description: "Nombre de la cuenta de Instagram, ej: MEMECENTISTAS® o MEMECENTISTAS" },
            accountHandle: { type: Type.STRING, description: "Handle o usuario de Instagram, ej: memecentistas" },
            bio: { type: Type.STRING, description: "Biografía completa del perfil, ej: Museo Nacional del Meme y del Perreo..." },
            postsCount: { type: Type.INTEGER, description: "Frecuencia o total de publicaciones, ej: 871" },
            followingCount: { type: Type.INTEGER, description: "Cuentas que sigue la cuenta, ej: 190" },
            metrics: {
              type: Type.OBJECT,
              properties: {
                followers: { type: Type.INTEGER, description: "Seguidores de la cuenta" },
                reach: { type: Type.INTEGER, description: "Cuentas alcanzadas" },
                impressions: { type: Type.INTEGER, description: "Impresiones totales" },
                profileVisits: { type: Type.INTEGER, description: "Visitas al perfil" },
                websiteClicks: { type: Type.INTEGER, description: "Clics en el sitio web" },
                engagementRate: { type: Type.NUMBER, description: "Tasa de interacción en % (por ejemplo 5.4)" }
              }
            },
            demographics: {
              type: Type.OBJECT,
              properties: {
                topCountries: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING, description: "Nombre del país" },
                      value: { type: Type.NUMBER, description: "Porcentaje (ej. 42.5)" }
                    },
                    required: ["name", "value"]
                  }
                },
                ageGroups: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING, description: "Rango de edad (ej. 25-34)" },
                      value: { type: Type.NUMBER, description: "Porcentaje" }
                    },
                    required: ["name", "value"]
                  }
                },
                gender: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING, description: "Género (ej. Mujeres, Hombres)" },
                      value: { type: Type.NUMBER, description: "Porcentaje" }
                    },
                    required: ["name", "value"]
                  }
                }
              }
            },
            posts: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  caption: { type: Type.STRING, description: "Texto u descripción breve de la publicación" },
                  type: { type: Type.STRING, description: "Tipo de post: 'post', 'reel', 'carousel', 'story'" },
                  likes: { type: Type.INTEGER },
                  comments: { type: Type.INTEGER },
                  shares: { type: Type.INTEGER },
                  saves: { type: Type.INTEGER },
                  reach: { type: Type.INTEGER }
                },
                required: ["caption", "type", "likes"]
              }
            },
            summaryText: { type: Type.STRING, description: "Resumen humano explicativo en español de lo que se leyó de la imagen" }
          },
          required: ["detectedMetricType", "summaryText"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    res.json(result);
  } catch (error: any) {
    console.error("Error analyzing screenshot:", error);
    res.status(500).json({ error: error.message || "Error al procesar la imagen con Gemini" });
  }
});

// 2. Build detailed Marketing AI Report for Instagram account (using Search Grounding if available to learn about the account context)
app.post("/api/generate-report", async (req, res) => {
  try {
    const { accountName, accountHandle, niche, metrics, posts, demographics, period } = req.body;
    
    const ai = getGenAI();

    // Query Google Search to see if Gemini knows anything about this account or its content pillars
    let searchGroundingContext = "";
    try {
      const searchQuery = `instagram account ${accountHandle || accountName} memecentistas`;
      const searchResponse = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Investiga de qué trata la cuenta de Instagram "${accountHandle}" o "${accountName}". ¿Cuáles son sus temas, estilo visual, tipo de humor, creador (si aparece) y el valor de su contenido? Devuelve un resumen compacto.`,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });
      searchGroundingContext = searchResponse.text || "";
      console.log("Search grounding success:", searchGroundingContext.substring(0, 150));
    } catch (e) {
      console.warn("Search grounding was skipped or failed. Continuing without it.", e);
    }

    const prompt = `Actúa como un experto en Marketing Digital y consultor principal de Estrategia para cuentas de alto perfil creativo y marcas intelectuales/urbanas en español. 
Te han pedido un reporte altamente profesional, comercial y persuasivo para la marca y estudio artístico:
- Nombre: ${accountName}
- Identificador: ${accountHandle}
- Nicho propuesto por el usuario: ${niche}
- Período de reporte: ${period || "Últimos 30 días"}

Aquí tienes los datos actuales de la cuenta para analizar:
MÉTRICAS CORE:
- Seguidores: ${metrics.followers} (${metrics.followersGrowth >= 0 ? '+' : ''}${metrics.followersGrowth}% de crecimiento)
- Alcance (Reach): ${metrics.reach} cuentas
- Impresiones: ${metrics.impressions}
- Visitas al perfil: ${metrics.profileVisits}
- Clics en Web: ${metrics.websiteClicks}
- Engagement Rate promedio: ${metrics.engagementRate}%

DATOS AUDIENCIA (DEMOGRAFÍA):
- Género: ${JSON.stringify(demographics.gender)}
- Rangos de Edad: ${JSON.stringify(demographics.ageGroups)}
- Países Top: ${JSON.stringify(demographics.topCountries)}
- Ciudades Top: ${JSON.stringify(demographics.topCities)}

MEJORES PUBLICACIONES:
${JSON.stringify(posts)}

CONTESTO GENERAL Y ANÁLISIS DEL ENTORNO DE LA CUENTA (Búsqueda en Google):
${searchGroundingContext || "No se obtuvieron resultados externos adicionales. Analiza según la temática descrita por el usuario (normalmente memes refinados, de historia del arte, cultura, filosofía o similar en español si el identificador es memecentistas)."}

VALORES, TONO E HITOS DE REFERENCIA DE MEMECENTISTAS (Incorpóralos orgánicamente en tu redacción):
1. Creadores del movimiento "Neaclasicismo": Fusión disruptiva y poética del arte clásico (especialmente del Barroco y Renacimiento) con la cultura popular contemporánea, el reggaeton y el lifestyle urbano ("Lo de antes, lo de ahora").
2. Su lema de marca: "Democratizar el arte a través de la cultura popular".
3. Tonalidad: No escribas recomendaciones operativas internas o correctivas ("deben publicar más", "mejores hashtags", etc.). Nosotros NO mostramos falencias ni fallos. El objetivo de este reporte es VENDER, vernos inmensos, líderes de un movimiento artístico único, sumamente atractivos para patrocinadores, marcas de consumo masivo y clientes comerciales.
4. Hitos de éxito históricos clave:
   - Exposición-fiesta "UN PERREO VIOLENTO" y "UN PERREO VIOLENTO II: LA EXPULSIÓN DEL PARAÍSO": El primer evento nacional de exposición-perreo en "El Candelario" (Bogotá) con marcas aliadas como Chivas Extra y Budweiser, y más de 750 asistentes VIP.
   - Colaboración con "Discovery Channel" en la campaña "El Arte del Perreo": Creación de una serie de 5 video-tomos de análisis de convergencia entre clásicos de la pintura y la contemporaneidad.
   - "Quarentena" y "Arriba / Abajo" con "Perro Negro": Eventos masivos por Instagram Live que conectaron a más de 12,500 personas simultáneamente durante el confinamiento.
   - Colección oficial de Merch "LQNIAS" (Las que no iban a salir) y la colaboración "LOLAS x Memecentistas", uniendo las obras inmortales de Artemisia Gentileschi y pintores barrocos con el empoderamiento femenino.
   - COLABORACIÓN RECIENTE CON 'ANIMAL': Un rotundo éxito editorial y de diseño de prendas premium, logrando sold-out inmediato y demostrando la capacidad del Neaclasicismo para disparar engagement comercial genuino de alto rendimiento.

Esquema requerido para la respuesta:
- accountVibe: Análisis persuasivo y cautivador de cómo Memecentistas® lidera el Neaclasicismo digital, posicionando el estudio artístico como el canal de co-creación más premium y disruptivo de la actualidad para conectar con el público joven e intelectual (18 a 34 años).
- swotAnalysis: Matriz DAFO comercial enfocado enteramente en el éxito y la grandeza:
  * "strengths": Ventajas competitivas únicas (estudio artístico consolidado, un nicho sin competidores reales en habla hispana, engagement inigualable y comunidad ultra-fiel).
  * "weaknesses": Oportunidades estratégicas que esperan patrocinio de gran calibre. NUNCA menciones fallos internos. Preséntalo como por ejemplo: "Áreas maduras listas para un patrocinio de gran escala que expanda el tiraje de ropa de alta gama", o "Foco óptimo para financiamiento de un tour presencial de exposiciones-perreo por Latinoamérica".
  * "opportunities": Alianzas comerciales de enorme escala, activaciones de marcas de consumo que buscan ser valientes, y co-diseños del Neaclasicismo.
  * "threats": Factores del mercado (como algoritmos o imitación) completamente mitigados de raíz debido al blindaje de tener un público ultra leal y una firma cultural inimitable.
- keyFindings: 4 insights de alto nivel basados en los datos (ej: el dominio aplastante del sector 18-34, el inmenso engagement del 9.8%, o la increíble propensión a guardar y compartir el contenido, convirtiendo la marca en boca a boca orgánico masivo).
- monetizationOpportunities: 3 o 4 propuestas comerciales audaces y listas para su firma con clientes de marcas de vino, licores (como Chivas o Dislicores), marcas de moda editorial (Animal), plataformas de streaming o marcas de lifestyle de lujo.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            accountVibe: { type: Type.STRING, description: "Descripción detallada de la identidad de marca, tono y conexión con el público" },
            swotAnalysis: {
              type: Type.OBJECT,
              properties: {
                strengths: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Fortalezas internas" },
                weaknesses: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Debilidades internas" },
                opportunities: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Oportunidades externas" },
                threats: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Amenazas externas" }
              },
              required: ["strengths", "weaknesses", "opportunities", "threats"]
            },
            keyFindings: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Hallazgos empíricos y lectura profunda de sus datos numéricos" },
            monetizationOpportunities: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Propuestas de monetización, activaciones comerciales y patrocinio" }
          },
          required: ["accountVibe", "swotAnalysis", "keyFindings", "monetizationOpportunities"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    res.json(result);
  } catch (error: any) {
    console.error("Error generating report:", error);
    res.status(500).json({ error: error.message || "Error al generar el reporte con Gemini" });
  }
});

// Serve health status
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Instagram Reporter API runs perfectly!" });
});

// Configure Vite or Static files depending on mode
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Serving application in development mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving application in production mode...");
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

setupVite().catch(err => {
  console.error("Failed to bootstrap server:", err);
  process.exit(1);
});
