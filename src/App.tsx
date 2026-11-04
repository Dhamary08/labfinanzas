import { useEffect, useState, type ReactNode } from "react"
import logoWhite from "./assets/brand/logo-white.svg"
import logoNegative from "./assets/brand/logo-negative.svg"
import logoBlack from "./assets/brand/logo-black.svg"
import logoPositive from "./assets/brand/logo-positive.svg"
import categoryNews from "./assets/brand/category-news.svg"
import categoryCourses from "./assets/brand/category-courses.svg"
import categoryQuickRead from "./assets/brand/category-quick-read.svg"
import categoryOther from "./assets/brand/category-other.svg"
import categoryTips from "./assets/brand/category-tips.svg"
import categoryTv from "./assets/brand/category-tv.svg"

type Page = "home" | "about" | "business" | "personal" | "catalog" | "blog" | "plans" | "checkout" | "kit" | "login" | "discover" | "discoverReports" | "learning" | "history" | "notifications" | "settings"

type PurchaseItem = {
  kind: "plan" | "course" | "report"
  title: string
  subtitle: string
  price: string
  image?: string
  code?: string
  planGroup?: "membership" | "reports"
  billingCycle?: "annual" | "quarterly" | "monthly"
}

type IconName = "arrow" | "book" | "briefcase" | "cart" | "chart" | "check" | "chevron" | "clock" | "eye" | "lock" | "mail" | "menu" | "play" | "search" | "settings" | "spark" | "user" | "x"

const priceToNumber = (price: string) =>
  Number(price.replace(/[^\d]/g, "")) || 0

const formatPrice = (value: number) =>
  `$${new Intl.NumberFormat("es-CL").format(value)}`

const purchaseTotal = (items: PurchaseItem[]) =>
  formatPrice(items.reduce((total, item) => total + priceToNumber(item.price), 0))

const subscriptionCatalog = {
  membership: {
    kicker: "MEMBRESÍA LAB+",
    heading: "Procede al pago para empezar a aprender",
    includes: [
      "Acceso ilimitado a todos los cursos sobre finanzas personales, inversiones y empresas.",
      "Biblioteca completa de informes mensuales, trimestrales y especiales.",
      "Recomendaciones personalizadas, certificados y seguimiento de tu progreso.",
    ],
    options: {
      annual: {
        title: "Membresía Lab+ Anual",
        label: "Acceso anual",
        badge: "El mejor valor",
        monthlyEquivalent: "$6.665/mes",
        originalMonthly: "$9.990/mes",
        price: "$79.990",
        originalPrice: "$119.880",
        billingNote: "Facturado una vez al año",
        cadenceLabel: "al año",
        renewalDate: "3 de noviembre de 2027",
        discount: "-$39.890",
      },
      quarterly: {
        title: "Membresía Lab+ Trimestral",
        label: "Acceso trimestral",
        badge: "Ahorra 16%",
        monthlyEquivalent: "$8.330/mes",
        originalMonthly: "$9.990/mes",
        price: "$24.990",
        originalPrice: "$29.970",
        billingNote: "Facturado cada 3 meses",
        cadenceLabel: "cada 3 meses",
        renewalDate: "3 de febrero de 2027",
        discount: "-$4.980",
      },
      monthly: {
        title: "Membresía Lab+ Mensual",
        label: "Acceso mensual",
        badge: "",
        monthlyEquivalent: "$9.990/mes",
        originalMonthly: "",
        price: "$9.990",
        originalPrice: "$9.990",
        billingNote: "Facturación mensual flexible",
        cadenceLabel: "al mes",
        renewalDate: "3 de diciembre de 2026",
        discount: "$0",
      },
    },
  },
  reports: {
    kicker: "SUSCRIPCIÓN DE INFORMES",
    heading: "Procede al pago para recibir tus informes",
    includes: [
      "Entrega automática en tu correo y biblioteca apenas se publique cada edición.",
      "Lecturas ejecutivas sobre mercados, dólar, inflación, tasas y proyecciones.",
      "Acceso permanente al historial de ediciones incluidas durante tu suscripción.",
    ],
    options: {
      annual: {
        title: "Suscripción Informes Anual",
        label: "Plan anual",
        badge: "El mejor valor",
        monthlyEquivalent: "$4.165/mes",
        originalMonthly: "$6.990/mes",
        price: "$49.990",
        originalPrice: "$83.880",
        billingNote: "12 ediciones + especiales del año",
        cadenceLabel: "al año",
        renewalDate: "3 de noviembre de 2027",
        discount: "-$33.890",
      },
      quarterly: {
        title: "Suscripción Informes Trimestral",
        label: "Plan trimestral",
        badge: "Ahorra 14%",
        monthlyEquivalent: "$5.996/mes",
        originalMonthly: "$6.990/mes",
        price: "$17.990",
        originalPrice: "$20.970",
        billingNote: "Seguimiento de mediano plazo",
        cadenceLabel: "cada 3 meses",
        renewalDate: "3 de febrero de 2027",
        discount: "-$2.980",
      },
      monthly: {
        title: "Suscripción Informes Mensual",
        label: "Plan mensual",
        badge: "",
        monthlyEquivalent: "$6.990/mes",
        originalMonthly: "",
        price: "$6.990",
        originalPrice: "$6.990",
        billingNote: "Una edición ejecutiva cada mes",
        cadenceLabel: "al mes",
        renewalDate: "3 de diciembre de 2026",
        discount: "$0",
      },
    },
  },
} as const

const images = {
  hero: "https://images.unsplash.com/photo-1758691737083-0e7fdbde0f05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1400",
  desk: "https://images.unsplash.com/photo-1707157284454-553ef0a4ed0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200",
  calculator:
    "https://images.unsplash.com/photo-1648201637025-1c77b9be3013?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1000",
  laptop:
    "https://images.unsplash.com/flagged/photo-1553267252-d100936057c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1000",
  team: "https://images.unsplash.com/photo-1758691736975-9f7f643d178e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200",
  director:
    "./assets/brand/imagen-director.svg",
}

const courses = [
  {
    audience: "Empresas",
    title: "Finanzas para decisiones de negocio",
    description:
      "Domina el flujo de caja, los márgenes y las métricas que hacen crecer una empresa.",
    lessons: "8 módulos",
    time: "4 h 30 min",
    price: "$39.900",
    image: images.desk,
    premium: true,
  },
  {
    audience: "Inversiones",
    title: "Tu primera cartera de inversión",
    description:
      "Aprende a definir tu perfil y construir una estrategia diversificada desde cero.",
    lessons: "6 módulos",
    time: "3 h 15 min",
    price: "Gratis",
    image: images.laptop,
    premium: false,
  },
  {
    audience: "Finanzas personales",
    title: "Ordena hoy tus finanzas",
    description:
      "Un método simple para organizar gastos, deudas, ahorro y metas de corto plazo.",
    lessons: "5 módulos",
    time: "2 h 40 min",
    price: "$19.900",
    image: images.calculator,
    premium: true,
  },
]

const catalogCourses = [
  ...courses,
  {
    audience: "Mercados",
    title: "Cómo leer el mercado cada mañana",
    description:
      "Indicadores, noticias y señales para construir una rutina de análisis.",
    lessons: "7 módulos",
    time: "3 h 50 min",
    price: "$24.900",
    image: images.desk,
    premium: true,
    level: "Intermedio",
  },
  {
    audience: "Empresas",
    title: "Flujo de caja sin complicaciones",
    description: "Proyecta entradas, salidas y necesidades de financiamiento.",
    lessons: "5 módulos",
    time: "2 h 20 min",
    price: "Gratis",
    image: images.team,
    premium: false,
    level: "Inicial",
  },
  {
    audience: "Inversiones",
    title: "Fondos mutuos desde cero",
    description:
      "Compara alternativas y comprende costos, riesgo y rentabilidad.",
    lessons: "6 módulos",
    time: "3 h 10 min",
    price: "$19.900",
    image: images.laptop,
    premium: true,
    level: "Inicial",
  },
  {
    audience: "Finanzas personales",
    title: "Ahorro con objetivos reales",
    description: "Transforma tus metas en un plan concreto y sostenible.",
    lessons: "4 módulos",
    time: "1 h 45 min",
    price: "Gratis",
    image: images.calculator,
    premium: false,
    level: "Inicial",
  },
  {
    audience: "Empresas",
    title: "Precios, costos y rentabilidad",
    description:
      "Define precios con información y protege el margen de tu negocio.",
    lessons: "8 módulos",
    time: "4 h 10 min",
    price: "$34.900",
    image: images.desk,
    premium: true,
    level: "Intermedio",
  },
].map((course) => ({
  ...course,
  level: "level" in course ? course.level : "Inicial",
}))

type AnalysisArticle = {
  id: string
  tag: string
  badge?: string
  title: string
  excerpt: string
  date: string
  time: string
  image: string
  author: string
  role: string
  lead: string
  keyTakeaways: string[]
  metrics: { label: string; value: string; note: string }[]
  sections: { heading: string; paragraphs: string[]; highlight?: string }[]
  actionSteps: { title: string; detail: string }[]
  relatedCourseTitle: string
}

const featuredAnalysis: AnalysisArticle = {
  id: "senales-mercado-semanal",
  tag: "Mercados",
  badge: "Informe semanal",
  title: "El mercado cambia. Estas son las señales que vale la pena mirar.",
  excerpt:
    "Inflación, tasas y dólar: explicamos qué movió la semana y cuáles son los escenarios para los próximos días.",
  date: "14 Jun 2025",
  time: "8 min",
  image: images.desk,
  author: "Claudio González Iturriaga",
  role: "Director de Inversiones · Equipo de Análisis LabFinanzas",
  lead: "Los mercados financieros reaccionan antes de que los titulares confirmen una tendencia. Esta semana estuvo marcada por la moderación gradual de la inflación local, la cautela de la Reserva Federal en Estados Unidos y un tipo de cambio que volvió a ubicarse en torno a niveles clave para importadores e inversionistas.",
  keyTakeaways: [
    "La inflación mensual muestra señales de convergencia, pero los precios de servicios y energía siguen exigiendo prudencia en los recortes de tasa.",
    "El diferencial de tasas entre Chile y EE. UU. continúa siendo el principal motor de corto plazo para el peso chileno frente al dólar.",
    "Los tramos medios de renta fija en UF mantienen una relación retorno/riesgo atractiva frente a depósitos a plazo de muy corto vencimiento.",
  ],
  metrics: [
    {
      label: "TPM Chile (referencia)",
      value: "5,00%",
      note: "Pausa táctica a la espera de nuevos registros de inflación subyacente",
    },
    {
      label: "Inflación anual IPC",
      value: "4,1%",
      note: "Convergencia gradual hacia la meta del Banco Central en horizonte de 24 meses",
    },
    {
      label: "Dólar observado",
      value: "$945 – $975",
      note: "Banda relevante marcada por el precio del cobre y tasas globales",
    },
  ],
  sections: [
    {
      heading: "1. Inflación y tasas: por qué la velocidad importa tanto como el nivel",
      paragraphs: [
        "Durante el último año nos acostumbramos a ver recortes sucesivos en la Tasa de Política Monetaria (TPM). Sin embargo, la etapa actual del ciclo es distinta: el Banco Central ya retiró gran parte del impulso restrictivo y ahora cada movimiento adicional depende de que la inflación de servicios y los costos internos no generen segunda vuelta.",
        "Para las personas y las empresas, esto significa que las tasas de corto plazo —como las que entregan los depósitos a 30 o 60 días— seguirán ajustándose de forma más pausada, mientras que las tasas de créditos hipotecarios y de largo plazo dependerán mucho más de las condiciones financieras externas.",
      ],
      highlight:
        "Señal clave: no mires solo el dato puntual de IPC del mes; observa la inflación sin volátiles para anticipar los próximos movimientos del Banco Central.",
    },
    {
      heading: "2. Tipo de cambio: los tres factores que están moviendo al dólar",
      paragraphs: [
        "El precio del dólar en Chile responde simultáneamente a tres fuerzas: la fortaleza global de la divisa estadounidense, la evolución del precio del cobre y el diferencial de tasas entre el Banco Central de Chile y la Reserva Federal (Fed).",
        "Cuando la Fed posterga sus recortes de tasas en Estados Unidos, los flujos globales tienden a refugiarse en activos en dólares, presionando al alza el tipo de cambio local incluso en semanas en que el cobre se mantiene firme. Por eso es fundamental separar el ruido diario de la tendencia estructural.",
      ],
    },
    {
      heading: "3. Escenarios para las próximas semanas",
      paragraphs: [
        "En nuestro escenario base, proyectamos un mercado que premiará la selectividad y la gestión de duración. Quienes mantienen toda su liquidez estacionada en instrumentos a 30 días enfrentan riesgo de reinversión a tasas progresivamente menores.",
        "Para empresas con compromisos en moneda extranjera, las correcciones hacia la parte baja del rango cambiario representan ventanas concretas para cubrir flujos de los próximos 60 a 90 días sin especular con el piso exacto del mercado.",
      ],
    },
  ],
  actionSteps: [
    {
      title: "Para tus ahorros e inversiones",
      detail:
        "Evalúa escalonar vencimientos combinando liquidez inmediata con instrumentos en UF de plazo medio (1 a 3 años) para proteger poder adquisitivo.",
    },
    {
      title: "Para la caja de tu empresa",
      detail:
        "Si tienes pagos de importaciones o proveedores en dólares, define coberturas parciales por tramos en lugar de esperar un único precio objetivo.",
    },
    {
      title: "Para decisiones de endeudamiento",
      detail:
        "Compara siempre la Carga Anual Equivalente (CAE) y prioriza refinanciar pasivos de corto plazo con tasas variables caras.",
    },
  ],
  relatedCourseTitle: "Renta fija, tasas e inflación",
}

const articles: AnalysisArticle[] = [
  {
    id: "tasas-de-interes-decisiones",
    tag: "Mercados",
    title: "Tasas de interés: qué son y cómo impactan tus decisiones",
    excerpt:
      "Una guía directa para interpretar los movimientos del mercado sin perderte en tecnicismos.",
    date: "12 Jun 2025",
    time: "6 min",
    image: images.desk,
    author: "Claudio González Iturriaga",
    role: "Director Académico y de Inversiones · LabFinanzas",
    lead: "Cada vez que el Banco Central modifica su tasa de referencia, cambia el costo del crédito, el premio por ahorrar y la valoración de casi todos los activos financieros. Entender ese mecanismo de transmisión te permite adelantarte en tus decisiones cotidianas.",
    keyTakeaways: [
      "La tasa de interés es el precio del dinero en el tiempo: sube cuando hay que frenar la inflación y baja cuando se busca estimular la actividad.",
      "Los créditos de consumo y líneas rotativas reaccionan rápido a la tasa de política monetaria; los hipotecarios dependen de las tasas largas en UF.",
      "Cuando las tasas empiezan a bajar, mantener todo el ahorro en depósitos a 30 días reduce tu rentabilidad futura cada vez que renuevas.",
    ],
    metrics: [
      {
        label: "Efecto en ahorro corto",
        value: "Inmediato",
        note: "Los depósitos a plazo reflejan en pocos días los cambios en la TPM",
      },
      {
        label: "Efecto en hipotecarios",
        value: "Gradual (UF + largo plazo)",
        note: "Se mueve según bonos de largo plazo y riesgo país, no solo por la TPM",
      },
      {
        label: "Impacto en bonos",
        value: "Relación inversa",
        note: "Cuando las tasas de mercado bajan, el precio de los bonos vigentes sube",
      },
    ],
    sections: [
      {
        heading: "1. Qué es realmente la tasa de interés y por qué el Banco Central la mueve",
        paragraphs: [
          "Piensa en la tasa de interés como el costo de arrendar dinero. Cuando la economía se recalienta y los precios suben más rápido de lo deseable, el Banco Central encarece ese arriendo subiendo la Tasa de Política Monetaria (TPM). Así desincentiva el consumo a crédito y premia a quienes postergan gasto ahorrando.",
          "Por el contrario, cuando la inflación cede y la actividad económica pierde fuerza, el Banco Central reduce la tasa para aliviar el costo financiero de familias y empresas, facilitando nuevas inversiones y refinanciamientos.",
        ],
        highlight:
          "Regla práctica: la TPM marca el piso del costo del dinero a un día entre bancos, y desde ahí se transmite en cadena al resto de los productos financieros.",
      },
      {
        heading: "2. Cómo impacta en tus créditos y en tu capacidad de endeudamiento",
        paragraphs: [
          "No todas las deudas se mueven al mismo ritmo. Las tarjetas de crédito, líneas de sobregiro y créditos comerciales de capital de trabajo suelen reajustar sus condiciones rápidamente. En cambio, un crédito hipotecario a 20 o 25 años está anclado al rendimiento de los bonos largos en UF.",
          "Por eso muchas veces vemos que el Banco Central baja la tasa en dos o tres reuniones seguidas, pero los dividendos hipotecarios para nuevas compras tardan más meses en mostrar mejoras significativas.",
        ],
      },
      {
        heading: "3. Qué pasa con tus inversiones cuando cambia el ciclo de tasas",
        paragraphs: [
          "En renta fija existe una relación inversa entre tasa de mercado y precio del instrumento. Si compras hoy un bono o un fondo de deuda con tasas altas y durante el próximo año las tasas caen, tu instrumento gana valor de capital además de devengar intereses.",
          "Quien se queda únicamente renovando depósitos a 30 días disfruta de tranquilidad en el corto plazo, pero al momento de renovar se encuentra con tasas cada vez más bajas.",
        ],
      },
    ],
    actionSteps: [
      {
        title: "Revisa el plazo de tus ahorros",
        detail:
          "Separa tu fondo de emergencia (liquidez inmediata) del ahorro de mediano plazo que puede capturar tasas largas antes de nuevos recortes.",
      },
      {
        title: "Ordena tus pasivos por tasa real",
        detail:
          "Prioriza amortizar deudas rotativas y de consumo antes de prepagar créditos de largo plazo pactados a tasas bajas.",
      },
      {
        title: "Mira la tasa real (sobre inflación)",
        detail:
          "Un retorno nominal del 5% con inflación del 4,5% apenas preserva tu poder de compra; compara siempre contra la UF.",
      },
    ],
    relatedCourseTitle: "Renta fija, tasas e inflación",
  },
  {
    id: "cinco-senales-ordenar-caja",
    tag: "Empresas",
    title: "Cinco señales de que tu negocio necesita ordenar su caja",
    excerpt:
      "Cómo detectar a tiempo los problemas de liquidez y convertir los números en acción.",
    date: "08 Jun 2025",
    time: "5 min",
    image: images.team,
    author: "Equipo de Finanzas Corporativas",
    role: "Área Empresas y Pymes · LabFinanzas",
    lead: "Muchas empresas rentables en el papel entran en estrés financiero por un motivo simple: venden, emiten facturas y crecen, pero el efectivo entra mucho después de que vencen las obligaciones. Detectar a tiempo los síntomas de desorden en la caja evita decisiones de emergencia.",
    keyTakeaways: [
      "Vender más no siempre significa tener más caja: crecer con plazos de cobro largos consume capital de trabajo.",
      "Mezclar gastos personales de los socios con la cuenta operativa de la empresa distorsiona cualquier diagnóstico de liquidez.",
      "Un flujo de caja proyectado a 13 semanas permite anticipar baches de tesorería con tiempo para negociar.",
    ],
    metrics: [
      {
        label: "Horizonte mínimo de control",
        value: "13 semanas",
        note: "Proyección rodante de ingresos y egresos efectivos semana a semana",
      },
      {
        label: "Ciclo de conversión de caja",
        value: "Días cobro + inventario − pago",
        note: "Mide cuántos días tu negocio financia la operación con recursos propios",
      },
      {
        label: "Colchón operativo sugerido",
        value: "1,5 a 2 meses",
        note: "Gastos fijos esenciales cubiertos ante retrasos de clientes clave",
      },
    ],
    sections: [
      {
        heading: "1. Las cinco señales de alerta más frecuentes en pymes y empresas en crecimiento",
        paragraphs: [
          "Primera señal: llegas a fin de mes con utilidades contables en el estado de resultados, pero recurres a la línea de crédito para pagar sueldos, IVA o imposiciones. Segunda señal: no conoces con exactitud cuánto dinero ingresará efectivamente en las próximas cuatro semanas ni qué facturas están vencidas.",
          "Tercera señal: aceptas descuentos agresivos por pronto pago o tomas financiamiento corto de alto costo para tapar brechas puntuales. Cuarta señal: el inventario crece más rápido que las ventas. Quinta señal: las cuentas bancarias del negocio financian retiros sin planificación de los socios.",
        ],
        highlight:
          "La utilidad es una opinión contable; la caja es un hecho. Un negocio puede resistir meses con margen estrecho, pero no semanas sin liquidez.",
      },
      {
        heading: "2. El descalce entre facturación y cobranza efectiva",
        paragraphs: [
          "Cuando tu empresa paga proveedores e insumos al día 15 y cobra sus facturas al día 60 o 90, cada nuevo pedido exitoso exige poner más capital de trabajo sobre la mesa. Si ese crecimiento no va acompañado de una política clara de crédito y cobranza, el propio éxito comercial ahoga la tesorería.",
          "Ordenar la caja parte por medir la antigüedad real de las cuentas por cobrar y establecer hitos automáticos de seguimiento antes de la fecha de vencimiento, no después.",
        ],
      },
      {
        heading: "3. Cómo pasar del desorden reactivo a un flujo de caja predecible",
        paragraphs: [
          "No necesitas un software complejo para recuperar el control. Basta con instaurar un flujo de caja rodante de 13 semanas que registre exclusivamente entradas y salidas reales de dinero con impuestos incluidos.",
          "Separar los costos fijos impostergables de los gastos variables y fijar una remuneración formal para los socios transforma la conversación con bancos y proveedores.",
        ],
      },
    ],
    actionSteps: [
      {
        title: "Construye tu calendario de 13 semanas",
        detail:
          "Anota cada lunes los cobros comprometidos por cliente y los egresos fijos (remuneraciones, arriendo, impuestos, proveedores críticos).",
      },
      {
        title: "Gestiona la cobranza antes del vencimiento",
        detail:
          "Confirma recepción de factura e hito de pago 7 días antes del vencimiento para detectar reparos administrativos a tiempo.",
      },
      {
        title: "Separa tesorería operativa de reserva",
        detail:
          "Destina una cuenta o fondo money market exclusivo para provisionar IVA, impuesto a la renta y leyes sociales.",
      },
    ],
    relatedCourseTitle: "Flujo de caja para negocios",
  },
  {
    id: "diversificar-portafolio-riesgo",
    tag: "Inversiones",
    title: "Diversificar no es tener muchas inversiones",
    excerpt:
      "Qué significa realmente distribuir el riesgo y por qué importa para tu portafolio.",
    date: "02 Jun 2025",
    time: "7 min",
    image: images.laptop,
    author: "Claudio González Iturriaga",
    role: "Director de Inversiones · Equipo de Análisis LabFinanzas",
    lead: "Un inversionista puede tener diez fondos mutuos en tres instituciones distintas y aun así estar apostando exactamente al mismo factor de riesgo. La verdadera diversificación no consiste en acumular productos, sino en combinar activos que reaccionen distinto ante un mismo escenario económico.",
    keyTakeaways: [
      "Acumular varios fondos o acciones que se mueven juntos frente a las tasas o el ciclo local ofrece una falsa sensación de seguridad.",
      "La correlación entre activos —cómo se comportan unos cuando otros caen— es el corazón de un portafolio bien construido.",
      "Diversificar incluye moneda, geografía, clase de activo (renta fija vs. renta variable) y horizonte de liquidez.",
    ],
    metrics: [
      {
        label: "Dimensiones clave",
        value: "4 ejes",
        note: "Clase de activo, moneda (CLP/UF/USD), geografía y plazo de liquidez",
      },
      {
        label: "Error común",
        value: "Sobreconcentración local",
        note: "Tener ingreso laboral, propiedades y 100% del ahorro financiero en el mismo país y moneda",
      },
      {
        label: "Rebalanceo recomendado",
        value: "Semestral o anual",
        note: "Volver a los pesos objetivos evita que el activo ganador concentre todo el riesgo",
      },
    ],
    sections: [
      {
        heading: "1. La ilusión de cantidad: por qué cinco fondos pueden ser la misma apuesta",
        paragraphs: [
          "Es muy habitual revisar carteras de personas que contrataron cuatro o cinco fondos en distintas corredoras pensando que así reparten el riesgo. Al mirar qué hay dentro de cada fondo, descubrimos que todos invierten en las mismas diez grandes empresas locales o en bonos bancarios del mismo plazo.",
          "Cuando ocurre un evento inesperado en el mercado local, los cinco instrumentos retroceden al mismo tiempo. Eso no es diversificación; es fragmentación operativa con mayores comisiones.",
        ],
        highlight:
          "No preguntes cuántos instrumentos tienes en tu portafolio; pregunta qué pasaría con cada uno de ellos si mañana sube el dólar, cae el crecimiento o se mueven las tasas.",
      },
      {
        heading: "2. Los cuatro pilares de una diversificación efectiva",
        paragraphs: [
          "Una cartera robusta distribuye su exposición en cuatro niveles complementarios: primero, por clase de activo (deuda que aporta estabilidad de flujos y acciones que capturan crecimiento de largo plazo); segundo, por moneda (pesos, UF para proteger inflación local y dólares para amortiguar shocks externos).",
          "El tercer nivel es geográfico —no depender únicamente del ciclo económico chileno— y el cuarto es el horizonte temporal, calzando cada bloque de inversión con el momento en que necesitarás usar ese capital.",
        ],
      },
      {
        heading: "3. Cómo diseñar y mantener tu asignación sin sobrecomplicarte",
        paragraphs: [
          "La mayor parte del resultado de largo plazo de un portafolio proviene de su asignación estratégica de activos y de la disciplina para mantenerla, no de adivinar cuál será la acción ganadora del mes.",
          "Definir porcentajes claros según tu tolerancia al riesgo y rebalancear una o dos veces al año te obliga de manera natural a tomar utilidades en lo que subió demasiado y recomprar activos rezagados a mejores precios.",
        ],
      },
    ],
    actionSteps: [
      {
        title: "Haz una radiografía por exposición real",
        detail:
          "Agrupa tus inversiones actuales según moneda (CLP, UF, USD) y tipo de riesgo (tasa fija, acciones locales, acciones globales).",
      },
      {
        title: "Define tres bloques por objetivo",
        detail:
          "Liquidez de corto plazo (0-12 meses), estabilidad e inflación (1-3 años) y crecimiento patrimonial (3+ años).",
      },
      {
        title: "Simplifica instrumentos duplicados",
        detail:
          "Prefiere pocos vehículos transparentes, de bajo costo y baja correlación entre sí antes que una lista extensa difícil de seguir.",
      },
    ],
    relatedCourseTitle: "Cómo empezar a invertir",
  },
]

const allAnalysisArticles: AnalysisArticle[] = [featuredAnalysis, ...articles]

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </>
    ),
    book: (
      <>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
      </>
    ),
    briefcase: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" />
      </>
    ),
    cart: (
      <>
        <path d="M3 4h2l2.1 10.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L20 8H6" />
        <circle cx="10" cy="20" r="1" />
        <circle cx="17" cy="20" r="1" />
      </>
    ),
    chart: (
      <>
        <path d="M3 3v18h18" />
        <path d="m7 16 4-5 3 3 5-7" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    eye: (
      <>
        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
        <circle cx="12" cy="12" r="2.5" />
      </>
    ),
    lock: (
      <>
        <rect x="5" y="10" width="14" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    play: <path d="m9 7 8 5-8 5Z" />,
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1V21h-4v-.1a1.7 1.7 0 0 0-1.1-1.55 1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1-.4H3v-4h.1A1.7 1.7 0 0 0 4.65 8.5a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1V3h4v.1A1.7 1.7 0 0 0 15.5 4.65a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.15.37.36.7.6 1 .3.3.65.43 1 .43h.1v4H21c-.4 0-.75.13-1 .4-.28.3-.48.65-.6 1.07Z" />
      </>
    ),
    spark: (
      <path d="m12 3 1.4 4.1L17.5 8.5l-4.1 1.4L12 14l-1.4-4.1-4.1-1.4 4.1-1.4L12 3ZM18.5 15l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z" />
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    x: (
      <>
        <path d="M6 6l12 12M18 6 6 18" />
      </>
    ),
  }
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  )
}

type LogoVariant = "positive" | "negative" | "black" | "white"

function Logo({ variant = "positive" }: { variant?: LogoVariant }) {
  const sources = { positive: logoPositive, negative: logoNegative, black: logoBlack, white: logoWhite }
  return (
    <span className="logo" aria-label="LabFinanzas">
      <img src={sources[variant]} alt="LabFinanzas" />
    </span>
  )
}

function CategorySymbol({ type }: { type: "news" | "courses" | "quick" | "other" | "tips" | "tv" }) {
  const sources = { news: categoryNews, courses: categoryCourses, quick: categoryQuickRead, other: categoryOther, tips: categoryTips, tv: categoryTv }
  return <img className={`brand-category-symbol symbol-${type}`} src={sources[type]} alt="" />
}

function Header({
  page,
  navigate,
  cartItems,
  removeFromCart,
  goToCheckout,
}: {
  page: Page
  navigate: (page: Page) => void
  cartItems: PurchaseItem[]
  removeFromCart: (title: string) => void
  goToCheckout: () => void
}) {
  const [open, setOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const go = (target: Page) => {
    navigate(target)
    setOpen(false)
  }
  const learningActive = page === "business" || page === "personal"
  return (
    <header className="site-header">
      <div className="nav-shell">
        <button className="logo-button" onClick={() => go("home")}>
          <Logo />
        </button>
        <nav
          className={open ? "main-nav open" : "main-nav"}
          aria-label="Navegación principal"
        >
          <button
            className={page === "home" ? "active" : ""}
            onClick={() => go("home")}
          >
            Inicio
          </button>
          <button
            className={page === "about" ? "active" : ""}
            onClick={() => go("about")}
          >
            LabFinanzas
          </button>
          <div className="nav-group">
            <button className={learningActive ? "active" : ""}>
              Aprende <span className="nav-caret">⌄</span>
            </button>
            <div className="nav-dropdown">
              <button onClick={() => go("business")}>
                <span className="mini-icon">
                  <Icon name="briefcase" size={18} />
                </span>
                <span>
                  <strong>Empresas y emprendedores</strong>
                  <small>Herramientas para hacer crecer tu negocio</small>
                </span>
              </button>
              <button onClick={() => go("personal")}>
                <span className="mini-icon coral">
                  <Icon name="chart" size={18} />
                </span>
                <span>
                  <strong>Inversiones personales</strong>
                  <small>Decisiones informadas para tu futuro</small>
                </span>
              </button>
            </div>
          </div>
          <button
            className={page === "blog" ? "active" : ""}
            onClick={() => go("blog")}
          >
            Actualidad
          </button>
          <button
            className={page === "plans" ? "active" : ""}
            onClick={() => go("plans")}
          >
            Planes
          </button>
          <button className="mobile-login" onClick={() => go("login")}>
            Iniciar sesión
          </button>
        </nav>
        <div className="header-actions">
          <button className="icon-button search-button" aria-label="Buscar">
            <Icon name="search" />
          </button>
          <div
            className={`cart-menu ${cartOpen ? "open" : ""}`}
            onMouseEnter={() => setCartOpen(true)}
            onMouseLeave={() => setCartOpen(false)}
          >
            <button
              className="cart-trigger"
              aria-label={`Cesta con ${cartItems.length} productos`}
              aria-expanded={cartOpen}
              onClick={() => setCartOpen(!cartOpen)}
              onFocus={() => setCartOpen(true)}
            >
              <Icon name="cart" size={21} />
              {cartItems.length > 0 && <span>{cartItems.length}</span>}
            </button>
            <div className="cart-popover">
              {cartItems.length > 0 ? (
                <>
                  <div className="cart-popover-items">
                    {cartItems.slice(0, 3).map((item) => (
                      <article key={item.title}>
                        {item.image ? (
                          <img src={item.image} alt="" />
                        ) : (
                          <span className="cart-item-symbol">
                            <Icon name={item.kind === "report" ? "chart" : "book"} size={18} />
                          </span>
                        )}
                        <div>
                          <strong>{item.title}</strong>
                          <small>{item.subtitle}</small>
                          <b>{item.price}</b>
                        </div>
                        <button
                          aria-label={`Quitar ${item.title}`}
                          onClick={() => removeFromCart(item.title)}
                        >
                          <Icon name="x" size={14} />
                        </button>
                      </article>
                    ))}
                  </div>
                  <div className="cart-popover-total">
                    <span>Total</span>
                    <strong>{purchaseTotal(cartItems)}</strong>
                  </div>
                  <button className="cart-checkout" onClick={goToCheckout}>
                    Ir a pagar <Icon name="arrow" size={16} />
                  </button>
                </>
              ) : (
                <div className="empty-cart">
                  <span><Icon name="cart" size={22} /></span>
                  <strong>Tu cesta está vacía</strong>
                  <p>Explora cursos e informes y guarda aquí tus favoritos.</p>
                  <button onClick={() => go("catalog")}>Explorar contenido</button>
                </div>
              )}
            </div>
          </div>
          <button className="login-button" onClick={() => go("login")}>
            Iniciar sesión
          </button>
          <button className="primary small" onClick={() => go("catalog")}>
            Explorar contenido
          </button>
          <button
            className="menu-button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? "x" : "menu"} />
          </button>
        </div>
      </div>
    </header>
  )
}

function Footer({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Logo variant="white" />
          <p>
            Información, análisis y aprendizaje para que tomes mejores
            decisiones financieras.
          </p>
          <span>Hecho para entender, pensado para avanzar.</span>
        </div>
        <div>
          <strong>Explora</strong>
          <button onClick={() => navigate("business")}>Empresas</button>
          <button onClick={() => navigate("personal")}>
            Inversiones personales
          </button>
          <button onClick={() => navigate("blog")}>Actualidad</button>
        </div>
        <div>
          <strong>LabFinanzas</strong>
          <button onClick={() => navigate("about")}>Sobre nosotros</button>
          <button>Preguntas frecuentes</button>
          <button>Contacto</button>
          <button onClick={() => navigate("kit")}>Kit UX/UI</button>
        </div>
        <div className="newsletter">
          <strong>Ideas que valen</strong>
          <p>Una selección semanal para entender mejor tus finanzas.</p>
          <div>
            <input aria-label="Correo electrónico" placeholder="tu@email.com" />
            <button aria-label="Suscribirme">
              <Icon name="arrow" />
            </button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2025 LabFinanzas</span>
        <span>Privacidad · Términos y condiciones</span>
      </div>
    </footer>
  )
}

function CourseCard({
  course,
  onOpen,
}: {
  course: typeof courses[number]
  onOpen: () => void
}) {
  return (
    <article className="course-card">
      <div className="course-image">
        <img src={course.image} alt="" />
        <CategorySymbol type="courses" />
        <span className={course.premium ? "badge premium" : "badge free"}>
          {course.premium ? (
            <>
              <Icon name="lock" size={13} /> Premium
            </>
          ) : (
            "Acceso gratuito"
          )}
        </span>
        <button
          className="play-button"
          aria-label={`Ver ${course.title}`}
          onClick={onOpen}
        >
          <Icon name="play" size={18} />
        </button>
      </div>
      <div className="course-content">
        <span className="eyebrow small">{course.audience}</span>
        <h3>{course.title}</h3>
        <p>{course.description}</p>
        <div className="course-meta">
          <span>
            <Icon name="book" size={15} />
            {course.lessons}
          </span>
          <span>
            <Icon name="clock" size={15} />
            {course.time}
          </span>
        </div>
        <div className="course-bottom">
          <strong>{course.price}</strong>
          <button onClick={onOpen}>
            Ver curso <Icon name="arrow" size={17} />
          </button>
        </div>
      </div>
    </article>
  )
}

function ArticleCard({
  article,
  onOpen,
}: {
  article: typeof articles[number]
  onOpen: () => void
}) {
  return (
    <article className="article-card" onClick={onOpen}>
      <div className="article-visual">
        <img src={article.image} alt="" />
        <CategorySymbol type={article.tag === "Empresas" ? "tips" : article.tag === "Inversiones" ? "quick" : "news"} />
      </div>
      <div>
        <span className="eyebrow small">{article.tag}</span>
        <h3>{article.title}</h3>
        <p>{article.excerpt}</p>
        <div className="article-meta">
          <span>{article.date}</span>
          <span>{article.time} de lectura</span>
          <Icon name="arrow" size={18} />
        </div>
      </div>
    </article>
  )
}

function CourseBrowser({
  account = false,
  navigate,
  addToCart,
  cartItems = [],
}: {
  account?: boolean
  navigate: (page: Page) => void
  addToCart?: (item: PurchaseItem) => void
  cartItems?: PurchaseItem[]
}) {
  const [category, setCategory] = useState("Todos")
  const categories = [
    "Todos",
    "Finanzas personales",
    "Inversiones",
    "Empresas",
    "Mercados",
  ]
  const filtered =
    category === "Todos"
      ? catalogCourses
      : catalogCourses.filter((course) => course.audience === category)
  const rows = account
    ? [
        {
          title: "Recomendados para ti",
          subtitle: "Según tus intereses y actividad reciente",
          items: filtered.slice(0, 5),
        },
        {
          title: "Porque estás aprendiendo sobre inversiones",
          subtitle: "Profundiza los conceptos de tu ruta actual",
          items: [...filtered].reverse().slice(0, 5),
        },
        {
          title: "Cursos incluidos en tu plan",
          subtitle: "Acceso completo con Lab+ Anual",
          items: catalogCourses.filter((course) => course.premium).slice(0, 5),
        },
      ]
    : [
        {
          title: "Cursos para empezar",
          subtitle: "Una selección para dar el primer paso",
          items: filtered.slice(0, 5),
        },
        {
          title: "Lo más visto esta semana",
          subtitle: "Contenido elegido por la comunidad",
          items: [...filtered].reverse().slice(0, 5),
        },
        {
          title: "Acceso gratuito",
          subtitle: "Aprende sin suscripción",
          items: catalogCourses.filter((course) => !course.premium),
        },
      ]
  return (
    <div
      className={account ? "course-browser account-browser" : "course-browser"}
    >
      <section className="browser-hero">
        <img src={images.laptop} alt="" />
        <div className="browser-overlay" />
        <div className="browser-feature-copy">
          <span className="browser-label">
            {account ? "RECOMENDADO PARA TI" : "CURSO DESTACADO"}
          </span>
          <h1>
            Tu primera cartera
            <br />
            de inversión
          </h1>
          <p>
            Aprende a definir tu perfil, comprender el riesgo y construir una
            estrategia diversificada desde cero.
          </p>
          <div className="browser-meta">
            <span>6 módulos</span>
            <span>3 h 15 min</span>
            <span>Nivel inicial</span>
            <span className="match">
              {account ? "94% para ti" : "Acceso gratuito"}
            </span>
          </div>
          <div className="browser-actions">
            <button
              className="light-button"
              onClick={() => navigate(account ? "learning" : "login")}
            >
              <Icon name="play" size={18} />{" "}
              {account ? "Comenzar curso" : "Inscribirme gratis"}
            </button>
            <button className="ghost-button">
              <span>+</span> Mi lista
            </button>
          </div>
        </div>
        <span className="browser-index">01 / 04</span>
      </section>
      <div className="browser-content">
        <div className="browser-toolbar">
          <div>
            <span className="eyebrow">
              {account ? "Explora tu biblioteca" : "Aprende a tu ritmo"}
            </span>
            <h2>
              {account ? "¿Qué quieres aprender hoy?" : "Todos nuestros cursos"}
            </h2>
          </div>
          <div className="browser-categories">
            {categories.map((item) => (
              <button
                className={category === item ? "active" : ""}
                onClick={() => setCategory(item)}
                key={item}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        {account && (
          <section className="browser-progress-banner">
            <div className="progress-course-thumb">
              <img src={images.calculator} alt="" />
              <span>
                <Icon name="play" size={15} />
              </span>
            </div>
            <div>
              <small>CONTINÚA DONDE QUEDASTE</small>
              <h3>Ordena hoy tus finanzas</h3>
              <p>Lección 4 · Presupuesto con propósito</p>
            </div>
            <div className="progress-resume">
              <span>72% completado</span>
              <div>
                <i />
              </div>
            </div>
            <button onClick={() => navigate("learning")}>
              Continuar <Icon name="arrow" size={16} />
            </button>
          </section>
        )}
        <div className="course-rails">
          {rows.map((row) => (
            <section className="course-rail" key={row.title}>
              <div className="rail-heading">
                <div>
                  <h3>{row.title}</h3>
                  <p>{row.subtitle}</p>
                </div>
                <div>
                  <button aria-label="Anterior">
                    <Icon name="chevron" size={16} />
                  </button>
                  <button aria-label="Siguiente">
                    <Icon name="chevron" size={16} />
                  </button>
                </div>
              </div>
              <div className="rail-track">
                {row.items.map((course, index) => (
                  <article
                    className="stream-card"
                    key={`${row.title}-${course.title}`}
                  >
                    <div>
                      <img src={course.image} alt="" />
                      <span className="stream-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {course.premium && (
                        <span className="stream-lock">
                          <Icon name="lock" size={12} />
                        </span>
                      )}
                      <button
                        onClick={() =>
                          account
                            ? navigate("learning")
                            : course.premium
                              ? addToCart?.({
                                  kind: "course",
                                  title: course.title,
                                  subtitle: `${course.lessons} · ${course.time}`,
                                  price: course.price,
                                  image: course.image,
                                })
                              : navigate("login")
                        }
                      >
                        <Icon name={account ? "play" : "arrow"} size={17} />
                      </button>
                    </div>
                    <span className="stream-category">{course.audience}</span>
                    <h4>{course.title}</h4>
                    <div className="stream-meta">
                      <span>{course.level}</span>
                      <span>{course.time}</span>
                      {!course.premium && <strong>Gratis</strong>}
                    </div>
                    {!account && (
                      <div className="stream-purchase">
                        <p>
                          {course.premium
                            ? "Añádelo hoy y aprende a tu propio ritmo."
                            : "Empieza gratis y avanza cuando quieras."}
                        </p>
                        <div>
                          <strong>{course.price}</strong>
                          <button
                            className={cartItems.some((item) => item.title === course.title) ? "added" : ""}
                            disabled={course.premium && cartItems.some((item) => item.title === course.title)}
                            onClick={() =>
                              course.premium
                                ? addToCart?.({
                                    kind: "course",
                                    title: course.title,
                                    subtitle: `${course.lessons} · ${course.time}`,
                                    price: course.price,
                                    image: course.image,
                                  })
                                : navigate("login")
                            }
                          >
                            {course.premium
                              ? cartItems.some((item) => item.title === course.title)
                                ? "En la cesta"
                                : "Añadir a la cesta"
                              : "Inscribirme"}
                          </button>
                        </div>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
        {!account && (
          <section className="browser-public-cta">
            <div>
              <span className="eyebrow light">Acceso completo</span>
              <h2>
                Una sola membresía.
                <br />
                Todo por aprender.
              </h2>
              <p>
                Accede a cursos premium, informes y nuevas publicaciones cada
                mes.
              </p>
            </div>
            <button className="light-button" onClick={() => navigate("plans")}>
              Conocer Lab+ <Icon name="arrow" />
            </button>
          </section>
        )}
      </div>
    </div>
  )
}

function PublicCatalog({
  navigate,
  addToCart,
  cartItems,
}: {
  navigate: (page: Page) => void
  addToCart: (item: PurchaseItem) => void
  cartItems: PurchaseItem[]
}) {
  const [contentType, setContentType] = useState<"courses" | "reports">(
    "courses",
  )
  return (
    <main>
      <div className="public-content-switch">
        <div>
          <span>EXPLORAR CONTENIDO</span>
          <strong>Cursos e informes en un solo lugar</strong>
        </div>
        <div>
          <button
            className={contentType === "courses" ? "active" : ""}
            onClick={() => setContentType("courses")}
          >
            <Icon name="book" size={16} /> Cursos
          </button>
          <button
            className={contentType === "reports" ? "active" : ""}
            onClick={() => setContentType("reports")}
          >
            <Icon name="chart" size={16} /> Informes
          </button>
        </div>
      </div>
      {contentType === "courses" ? (
        <CourseBrowser navigate={navigate} addToCart={addToCart} cartItems={cartItems} />
      ) : (
        <ReportBrowser publicMode navigate={navigate} addToCart={addToCart} cartItems={cartItems} />
      )}
      <Footer navigate={navigate} />
    </main>
  )
}

function PremiumPlans({
  navigate,
  startCheckout,
}: {
  navigate: (page: Page) => void
  startCheckout: (item: PurchaseItem) => void
}) {
  const [billing, setBilling] = useState<"monthly" | "quarterly" | "annual">(
    "annual",
  )
  const plans = {
    monthly: {
      label: "Mensual",
      price: "$9.990",
      cadence: "/ mes",
      note: "Cancela cuando quieras",
      saving: "",
    },
    quarterly: {
      label: "Trimestral",
      price: "$24.990",
      cadence: "/ 3 meses",
      note: "Un pago cada trimestre",
      saving: "Ahorra 16%",
    },
    annual: {
      label: "Anual",
      price: "$79.990",
      cadence: "/ año",
      note: "El mejor valor para aprender",
      saving: "Ahorra 33%",
    },
  }
  const selected = plans[billing]
  const reports = [
    {
      period: "Mensual",
      description: "Una lectura ejecutiva del mes y sus variables clave.",
      price: "$6.990",
    },
    {
      period: "Trimestral",
      description: "Análisis de tendencias, escenarios y oportunidades.",
      price: "$17.990",
    },
    {
      period: "Anual",
      description: "Balance completo y perspectivas para el nuevo ciclo.",
      price: "$49.990",
    },
  ]
  return (
    <section className="premium-section">
      <div className="section-heading centered">
        <span className="eyebrow">Contenido premium, a tu manera</span>
        <h2>Elige cuánto quieres avanzar</h2>
        <p>
          Suscríbete para acceder a toda la biblioteca o compra únicamente el
          contenido que necesitas.
        </p>
      </div>
      <div className="premium-layout">
        <article className="subscription-card">
          <div className="plan-top">
            <div>
              <span className="plan-kicker">
                <Icon name="spark" size={15} /> Membresía Lab+
              </span>
              <h3>Todo el contenido, una sola membresía.</h3>
            </div>
            <span className="popular-badge">Más elegido</span>
          </div>
          <div className="billing-tabs">
            {(Object.keys(plans) as keyof typeof plans[]).map((key) => (
              <button
                key={key}
                className={billing === key ? "active" : ""}
                onClick={() => setBilling(key)}
              >
                {plans[key].label}
                {plans[key].saving && <small>{plans[key].saving}</small>}
              </button>
            ))}
          </div>
          <div className="plan-price">
            <strong>{selected.price}</strong>
            <span>{selected.cadence}</span>
          </div>
          <p className="plan-note">{selected.note}</p>
          <ul className="plan-benefits">
            <li>
              <Icon name="check" size={17} />
              Acceso ilimitado a todos los cursos premium
            </li>
            <li>
              <Icon name="check" size={17} />
              Informes y análisis exclusivos
            </li>
            <li>
              <Icon name="check" size={17} />
              Historial, progreso y recomendaciones
            </li>
            <li>
              <Icon name="check" size={17} />
              Nuevos contenidos cada mes
            </li>
          </ul>
          <button
            className="primary full"
            onClick={() =>
              startCheckout({
                kind: "plan",
                title: `Membresía Lab+ ${selected.label}`,
                subtitle: `${selected.cadence.replace("/ ", "cada ")} · Renovación automática`,
                price: selected.price,
                planGroup: "membership",
                billingCycle: billing,
              })
            }
          >
            Comenzar con Lab+ <Icon name="arrow" />
          </button>
          <small className="secure-copy">
            <Icon name="lock" size={13} /> Pago seguro · Renovación automática ·
            Cancela cuando quieras
          </small>
        </article>
        <div className="purchase-options">
          <article className="single-purchase">
            <span className="option-icon">
              <Icon name="book" size={22} />
            </span>
            <div>
              <span className="eyebrow small">Compra individual</span>
              <h3>Solo el curso que necesitas</h3>
              <p>
                Acceso de por vida a un curso específico, sus materiales y
                futuras actualizaciones.
              </p>
            </div>
            <div className="option-bottom">
              <span>
                Desde <strong>$19.900</strong>
              </span>
              <button onClick={() => navigate("personal")}>
                Ver cursos <Icon name="arrow" size={17} />
              </button>
            </div>
          </article>
          <article className="single-purchase report-option">
            <span className="option-icon">
              <Icon name="chart" size={22} />
            </span>
            <div>
              <span className="eyebrow small">Informes especializados</span>
              <h3>Recibe análisis en tu correo</h3>
              <p>
                Compra un informe puntual o elige una frecuencia de entrega
                según tu necesidad.
              </p>
            </div>
            <button
              className="report-link"
              onClick={() =>
                document
                  .getElementById("report-plans")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Conocer planes de informes <Icon name="arrow" size={17} />
            </button>
          </article>
        </div>
      </div>
      <div className="report-plans" id="report-plans">
        <div className="report-intro">
          <span className="eyebrow">Informes por suscripción</span>
          <h3>El contexto que necesitas, directo a tu correo.</h3>
          <p>
            Reportes claros y accionables para personas, inversionistas y
            equipos de negocio.
          </p>
        </div>
        <div className="report-grid">
          {reports.map((report, index) => (
            <article key={report.period}>
              <span className={`report-number r${index}`}>0{index + 1}</span>
              <h4>{report.period}</h4>
              <p>{report.description}</p>
              <div>
                <span>Desde</span>
                <strong>{report.price}</strong>
              </div>
              <button
                onClick={() =>
                  startCheckout({
                    kind: "plan",
                    title: `Suscripción Informes ${report.period}`,
                    subtitle: `${report.description}`,
                    price: report.price,
                    planGroup: "reports",
                    billingCycle:
                      report.period === "Mensual"
                        ? "monthly"
                        : report.period === "Trimestral"
                          ? "quarterly"
                          : "annual",
                  })
                }
              >
                Elegir informe <Icon name="arrow" size={16} />
              </button>
            </article>
          ))}
        </div>
      </div>
      <div className="payment-note">
        <span>
          <Icon name="lock" size={16} /> Pagos protegidos
        </span>
        <p>
          Podrás pagar con tarjetas de crédito o débito. Los valores mostrados
          son referenciales para este mockup.
        </p>
        <button onClick={() => navigate("plans")}>
          Ver todos los detalles <Icon name="arrow" size={16} />
        </button>
      </div>
    </section>
  )
}

function Home({
  navigate,
  startCheckout,
  openArticle,
}: {
  navigate: (page: Page) => void
  startCheckout: (item: PurchaseItem) => void
  openArticle: (articleId: string) => void
}) {
  return (
    <>
      <main>
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">
              <Icon name="spark" size={16} /> Finanzas para la vida real
            </span>
            <h1>
              Entiende tus finanzas.
              <br />
              <em>Decide con confianza.</em>
            </h1>
            <p>
              Información clara, análisis y aprendizaje para conectar tu mundo
              con el de los mercados, sin complicaciones.
            </p>
            <div className="hero-actions">
              <button className="primary" onClick={() => navigate("personal")}>
                Empieza a aprender <Icon name="arrow" />
              </button>
              <button className="text-button" onClick={() => navigate("about")}>
                Conoce LabFinanzas <Icon name="play" size={18} />
              </button>
            </div>
            <div className="trust-row">
              <div className="avatars">
                <span>CM</span>
                <span>FR</span>
                <span>AV</span>
              </div>
              <p>
                <strong>+2.500 personas</strong>
                <br />
                aprendiendo a su ritmo
              </p>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-wrap">
              <img
                src={images.hero}
                alt="Profesionales analizando información financiera"
              />
            </div>
            <div className="floating-card market-card">
              <span className="market-icon">
                <Icon name="chart" />
              </span>
              <div>
                <small>Mercados hoy</small>
                <strong>
                  IPS<span>A</span>
                </strong>
              </div>
              <p>+1,24%</p>
            </div>
            <div className="floating-card lesson-card">
              <span>
                <Icon name="play" size={17} />
              </span>
              <div>
                <small>Continúa aprendiendo</small>
                <strong>Cómo crear tu presupuesto</strong>
                <div className="progress">
                  <i />
                </div>
              </div>
              <b>68%</b>
            </div>
            <span className="hero-dot dot-one" />
            <span className="hero-dot dot-two" />
          </div>
        </section>

        <section className="path-section">
          <div className="section-heading centered">
            <span className="eyebrow">Elige tu camino</span>
            <h2>Contenido que se adapta a ti</h2>
            <p>
              Ya sea que quieras impulsar un negocio o construir tu futuro
              financiero, tenemos un punto de partida.
            </p>
          </div>
          <div className="path-grid">
            <button
              className="path-card business"
              onClick={() => navigate("business")}
            >
              <span className="path-icon">
                <Icon name="briefcase" size={26} />
              </span>
              <small>Para hacer crecer</small>
              <h3>
                Empresas y<br />
                emprendedores
              </h3>
              <p>
                Herramientas, informes y cursos para tomar mejores decisiones de
                negocio.
              </p>
              <span className="path-link">
                Explorar contenido <Icon name="arrow" size={18} />
              </span>
              <i className="decor-line" />
            </button>
            <button
              className="path-card personal"
              onClick={() => navigate("personal")}
            >
              <span className="path-icon">
                <Icon name="chart" size={26} />
              </span>
              <small>Para construir tu futuro</small>
              <h3>
                Inversiones
                <br />
                personales
              </h3>
              <p>
                Aprende a organizar, ahorrar e invertir con una estrategia que
                tenga sentido para ti.
              </p>
              <span className="path-link">
                Explorar contenido <Icon name="arrow" size={18} />
              </span>
              <i className="decor-line" />
            </button>
          </div>
        </section>

        <section className="featured-section">
          <div className="section-heading row">
            <div>
              <span className="eyebrow">Aprende a tu ritmo</span>
              <h2>Empieza por aquí</h2>
            </div>
            <button className="text-link" onClick={() => navigate("personal")}>
              Ver todos los cursos <Icon name="arrow" size={18} />
            </button>
          </div>
          <div className="course-grid">
            {courses.map((course) => (
              <CourseCard
                key={course.title}
                course={course}
                onOpen={() =>
                  navigate(
                    course.audience === "Empresas" ? "business" : "personal",
                  )
                }
              />
            ))}
          </div>
        </section>

        <PremiumPlans navigate={navigate} startCheckout={startCheckout} />

        <section className="insight-strip">
          <div>
            <span className="eyebrow light">Panorama semanal</span>
            <h2>
              Lo importante no es saberlo todo.
              <br />
              Es saber <em>qué mirar.</em>
            </h2>
            <p>
              Recibe una lectura clara de las variables que están moviendo los
              mercados y cómo pueden afectar tus decisiones.
            </p>
            <button className="light-button" onClick={() => navigate("blog")}>
              Leer el último informe <Icon name="arrow" />
            </button>
          </div>
          <div className="dashboard-card">
            <div className="dash-header">
              <span>Resumen de mercados</span>
              <small>Actualizado hoy</small>
            </div>
            {[
              ["IPSA", "7.921,34", "+1,24%"],
              ["USD / CLP", "$942,10", "-0,38%"],
              ["UF", "$39.181,42", "+0,02%"],
            ].map((row, i) => (
              <div className="market-row" key={row[0]}>
                <span className={`market-symbol s${i}`}>
                  {row[0].slice(0, 1)}
                </span>
                <strong>{row[0]}</strong>
                <span>{row[1]}</span>
                <b className={row[2].startsWith("+") ? "up" : "down"}>
                  {row[2]}
                </b>
              </div>
            ))}
            <div className="mini-chart">
              <svg viewBox="0 0 400 90" preserveAspectRatio="none">
                <path d="M0 70 C45 65 55 44 90 50 S145 75 180 44 S230 35 260 45 S330 13 400 20" />
                <path
                  className="area"
                  d="M0 70 C45 65 55 44 90 50 S145 75 180 44 S230 35 260 45 S330 13 400 20 V90 H0Z"
                />
              </svg>
            </div>
          </div>
        </section>

        <section className="articles-section">
          <div className="section-heading row">
            <div>
              <span className="eyebrow">Actualidad explicada</span>
              <h2>Ideas para decidir mejor</h2>
            </div>
            <button className="text-link" onClick={() => navigate("blog")}>
              Ver todos los artículos <Icon name="arrow" size={18} />
            </button>
          </div>
          <div className="article-grid">
            {articles.map((article) => (
              <ArticleCard
                key={article.title}
                article={article}
                onOpen={() => openArticle(article.id)}
              />
            ))}
          </div>
        </section>

        <section className="cta-section">
          <span className="eyebrow light">Tu próximo paso</span>
          <h2>Aprender de finanzas puede ser simple.</h2>
          <p>
            Empieza con contenido gratuito y avanza a tu ritmo. Sin letra chica.
          </p>
          <button
            className="primary coral-button"
            onClick={() => navigate("personal")}
          >
            Explorar contenido gratuito <Icon name="arrow" />
          </button>
        </section>
      </main>
      <Footer navigate={navigate} />
    </>
  )
}

const learningData = {
  business: {
    label: "Empresas y emprendedores",
    title: "Números claros para hacer crecer tu negocio.",
    text: "Aprende a leer la salud financiera de tu empresa, planificar con criterio y convertir información en decisiones.",
    image: images.team,
    accent: "green",
    topics: [
      "Flujo de caja",
      "Costos y precios",
      "Planificación",
      "Financiamiento",
    ],
  },
  personal: {
    label: "Inversiones personales",
    title: "Tu dinero puede trabajar mejor para ti.",
    text: "Construye una base financiera sólida y aprende a invertir de acuerdo con tus objetivos, no con la moda del momento.",
    image: images.laptop,
    accent: "coral",
    topics: ["Presupuesto", "Ahorro", "Inversiones", "Planificación"],
  },
}

function LearningPage({
  kind,
  navigate,
}: {
  kind: "business" | "personal"
  navigate: (page: Page) => void
}) {
  const data = learningData[kind]
  const filtered =
    kind === "business" ? [courses[0], courses[2]] : [courses[1], courses[2]]
  return (
    <main>
      <section className={`inner-hero ${data.accent}`}>
        <div>
          <span className="eyebrow light">{data.label}</span>
          <h1>{data.title}</h1>
          <p>{data.text}</p>
          <button className="light-button">
            Ver cursos e informes <Icon name="arrow" />
          </button>
        </div>
        <img src={data.image} alt="" />
      </section>
      <section className="topic-section">
        <div className="section-heading centered">
          <span className="eyebrow">Un camino más claro</span>
          <h2>¿Qué quieres aprender?</h2>
        </div>
        <div className="topic-grid">
          {data.topics.map((topic, i) => (
            <button key={topic}>
              <span>0{i + 1}</span>
              <strong>{topic}</strong>
              <Icon name="arrow" size={18} />
            </button>
          ))}
        </div>
      </section>
      <section className="catalog-section">
        <div className="section-heading row">
          <div>
            <span className="eyebrow">Contenido recomendado</span>
            <h2>Empieza con una base sólida</h2>
          </div>
          <div className="filter-pills">
            <button className="active">Todo</button>
            <button>Cursos</button>
            <button>Informes</button>
          </div>
        </div>
        <div className="course-grid two">
          {filtered.map((course) => (
            <CourseCard
              key={course.title}
              course={course}
              onOpen={() => navigate("login")}
            />
          ))}
        </div>
      </section>
      <section className="benefit-band">
        <div>
          <Icon name="book" />
          <strong>Aprendizaje práctico</strong>
          <span>Conceptos aplicados a decisiones reales.</span>
        </div>
        <div>
          <Icon name="clock" />
          <strong>A tu propio ritmo</strong>
          <span>Continúa siempre desde donde quedaste.</span>
        </div>
        <div>
          <Icon name="check" />
          <strong>Contenido experto</strong>
          <span>Claro, vigente y sin tecnicismos innecesarios.</span>
        </div>
      </section>
      <Footer navigate={navigate} />
    </main>
  )
}

function About({ navigate }: { navigate: (page: Page) => void }) {
  const ecosystem = [
    {
      icon: "book" as IconName,
      name: "Cursos y talleres",
      description:
        "Aprendizaje guiado para comprender dólar, acciones, criptomonedas, finanzas personales y decisiones de negocio.",
    },
    {
      icon: "play" as IconName,
      name: "Material audiovisual",
      description:
        "Explicaciones breves y flexibles para conectar conceptos financieros con situaciones reales.",
    },
    {
      icon: "eye" as IconName,
      name: "Visiones de mercado",
      description:
        "Lecturas sobre dólar y acciones que ayudan a interpretar el contexto, las tendencias y sus variables.",
    },
    {
      icon: "chart" as IconName,
      name: "Claves financieras",
      description:
        "Informes periódicos con análisis, escenarios y datos relevantes para formar un criterio propio.",
    },
  ]
  const questions = [
    "¿Qué acciones chilenas tienen buenas perspectivas?",
    "¿Por qué las acciones tecnológicas en EE.UU. suben tanto de valor?",
    "¿Son predecibles los vaivenes del dólar?",
    "¿Qué tipo de inversiones convienen en la actualidad?",
  ]
  return (
    <main>
      <section className="about-hero">
        <div>
          <span className="eyebrow">¿Qué es LabFinanzas?</span>
          <h1>Las finanzas no deberían sentirse como otro idioma.</h1>
          <p>
            Somos un ecosistema de información, análisis y aprendizaje
            financiero que conecta tu mundo con el de los mercados y sus
            principales variables.
          </p>
          <div className="about-actions">
            <button className="primary" onClick={() => navigate("catalog")}>
              Explorar el ecosistema <Icon name="arrow" />
            </button>
            <button className="text-link" onClick={() => navigate("plans")}>
              Conocer la membresía
            </button>
          </div>
        </div>
        <div className="about-image">
          <img src={images.team} alt="Equipo colaborando en LabFinanzas" />
          <span>Claridad antes que complejidad.</span>
        </div>
      </section>
      <section className="mission-section">
        <div>
          <span className="eyebrow">Nuestra convicción</span>
          <h2>Entender cambia la forma en que decides.</h2>
        </div>
        <div>
          <p>
            LabFinanzas busca ayudarte a entender el día a día de los mercados
            con lo que necesitas saber para manejar tus finanzas y tus
            inversiones.
          </p>
          <p>
            Creemos que todas las personas pueden tomar mejores decisiones
            cuando tienen acceso a información comprensible, contextualizada y
            útil. Por eso traducimos la complejidad financiera a formatos
            flexibles y accionables.
          </p>
        </div>
      </section>
      <section className="ecosystem-section">
        <div className="section-heading row">
          <div>
            <span className="eyebrow">Todo conectado</span>
            <h2>Un ecosistema para entender y actuar</h2>
          </div>
          <p>
            Desde una pregunta puntual hasta una ruta completa de aprendizaje.
          </p>
        </div>
        <div className="ecosystem-grid">
          {ecosystem.map((item, index) => (
            <article key={item.name}>
              <span className="ecosystem-number">0{index + 1}</span>
              <span className="ecosystem-icon">
                <Icon name={item.icon} />
              </span>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <button
                onClick={() =>
                  navigate(index === 2 || index === 3 ? "blog" : "catalog")
                }
              >
                Explorar <Icon name="arrow" size={16} />
              </button>
            </article>
          ))}
        </div>
      </section>
      <section className="director-section">
        <div className="director-portrait">
          <img
            src={images.director}
            alt="Claudio González Iturriaga, director de LabFinanzas"
          />
          <span>Dirección académica</span>
        </div>
        <div className="director-message">
          <span className="quote-mark">“</span>
          <span className="eyebrow light">Bienvenida de nuestro director</span>
          <blockquote>
            Queremos abrir un espacio para la comunidad que permita conectar los
            puntos entre las personas, las finanzas y las inversiones.
          </blockquote>
          <p>
            El mundo financiero puede parecer complejo y distante. Creemos que
            podemos ayudar a cerrar esa brecha de información, entregando
            formación e información financiera para que cada persona comprenda
            mejor este mundo y pueda tomar sus propias decisiones.
          </p>
          <div className="director-signature">
            <strong>Claudio González Iturriaga</strong>
            <span>Director de Inversiones, GH Capital Invest</span>
            <span>
              Director académico de programas de Uejecutivos, FEN Universidad de
              Chile
            </span>
          </div>
        </div>
      </section>
      <section className="questions-section">
        <div>
          <span className="eyebrow">Las preguntas importan</span>
          <h2>Empezamos por lo que necesitas entender.</h2>
          <p>
            LabFinanzas convierte preguntas habituales del mercado en
            aprendizaje, análisis y herramientas concretas.
          </p>
          <button className="primary" onClick={() => navigate("blog")}>
            Ver análisis y actualidad <Icon name="arrow" />
          </button>
        </div>
        <div className="question-list">
          {questions.map((question, index) => (
            <button onClick={() => navigate("blog")} key={question}>
              <span>0{index + 1}</span>
              <strong>{question}</strong>
              <Icon name="arrow" />
            </button>
          ))}
        </div>
      </section>
      <section className="values-section">
        {[
          [
            "01",
            "Claro, no simplista",
            "Explicamos con lenguaje directo sin perder profundidad.",
          ],
          [
            "02",
            "Útil desde el primer día",
            "Cada contenido debe ayudarte a tomar una acción o entender una decisión.",
          ],
          [
            "03",
            "Independiente y responsable",
            "Información rigurosa para que formes tu propio criterio.",
          ],
        ].map((v) => (
          <div key={v[0]}>
            <span>{v[0]}</span>
            <h3>{v[1]}</h3>
            <p>{v[2]}</p>
          </div>
        ))}
      </section>
      <section className="about-access">
        <div>
          <span className="eyebrow light">Acceso flexible</span>
          <h2>Aprende gratis o accede sin restricciones.</h2>
          <p>
            Comienza con contenido abierto y elige una membresía para acceder a
            cursos, talleres, material audiovisual, Visiones e informes de
            Claves Financieras.
          </p>
        </div>
        <div>
          <span>LAB+</span>
          <strong>Todo el ecosistema en un solo lugar.</strong>
          <button className="light-button" onClick={() => navigate("plans")}>
            Ver planes y formas de pago <Icon name="arrow" />
          </button>
        </div>
      </section>
      <section className="about-cta">
        <h2>Tu relación con las finanzas puede empezar a cambiar hoy.</h2>
        <button className="primary" onClick={() => navigate("catalog")}>
          Encuentra tu punto de partida <Icon name="arrow" />
        </button>
      </section>
      <Footer navigate={navigate} />
    </main>
  )
}

function Blog({
  navigate,
  selectedArticleId,
  onSelectArticle,
}: {
  navigate: (page: Page) => void
  selectedArticleId: string | null
  onSelectArticle: (articleId: string | null) => void
}) {
  const [filter, setFilter] = useState("Todos")
  const videoCapsules = [
    {
      id: "SFgi-V8X75s",
      tag: "Dólar",
      title: "Dólar sobre los mil pesos: ¿qué puede frenar su avance?",
      source: "Entrevista · 24 Horas",
      duration: "08:42",
    },
    {
      id: "rTw_DA5swug",
      tag: "Economía",
      title:
        "Imacec y actividad económica: cómo interpretar un crecimiento de 0%",
      source: "Análisis · 24 Horas",
      duration: "07:18",
    },
    {
      id: "tugVZCz06Qk",
      tag: "Panorama",
      title: "Claudio González analiza el estado de la economía chilena",
      source: "Conversación económica",
      duration: "12:06",
    },
    {
      id: "_mv6XeX2QIM",
      tag: "Mercados",
      title: "Dólar bordeando los $1.000: incertidumbre y escenarios",
      source: "Entrevista · TVN Chile",
      duration: "09:31",
    },
  ]
  const [activeVideo, setActiveVideo] = useState(videoCapsules[0])
  const selectedArticle = allAnalysisArticles.find(
    (item) => item.id === selectedArticleId,
  )

  if (selectedArticle) {
    const otherArticles = allAnalysisArticles.filter(
      (item) => item.id !== selectedArticle.id,
    )
    const symbolType =
      selectedArticle.tag === "Empresas"
        ? "tips"
        : selectedArticle.tag === "Inversiones"
          ? "quick"
          : "news"

    return (
      <main>
        <article className="analysis-detail">
          <div className="analysis-detail-topbar">
            <button
              type="button"
              className="analysis-back-btn"
              onClick={() => onSelectArticle(null)}
            >
              <span className="analysis-back-arrow">←</span> Volver a Actualidad
            </button>
            <div className="analysis-detail-breadcrumbs">
              <span>Actualidad</span>
              <span>·</span>
              <strong>{selectedArticle.tag}</strong>
            </div>
          </div>

          <header className="analysis-detail-hero">
            <div className="analysis-detail-copy">
              <div className="analysis-detail-badges">
                <span className="badge free">
                  {selectedArticle.badge ?? selectedArticle.tag}
                </span>
                <span className="analysis-reading-pill">
                  {selectedArticle.date} · {selectedArticle.time} de lectura
                </span>
              </div>
              <h1>{selectedArticle.title}</h1>
              <p className="analysis-detail-excerpt">
                {selectedArticle.excerpt}
              </p>
              <div className="analysis-author-row">
                <div className="analysis-author-avatar">LF</div>
                <div>
                  <strong>{selectedArticle.author}</strong>
                  <span>{selectedArticle.role}</span>
                </div>
              </div>
            </div>
            <div className="analysis-detail-visual">
              <img src={selectedArticle.image} alt={selectedArticle.title} />
              <CategorySymbol type={symbolType} />
            </div>
          </header>

          <section className="analysis-metrics-strip">
            {selectedArticle.metrics.map((metric) => (
              <div className="analysis-metric-card" key={metric.label}>
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
                <p>{metric.note}</p>
              </div>
            ))}
          </section>

          <div className="analysis-detail-layout">
            <div className="analysis-detail-body">
              <p className="analysis-lead">{selectedArticle.lead}</p>

              <div className="analysis-takeaways-box">
                <div className="analysis-takeaways-head">
                  <Icon name="spark" size={18} />
                  <strong>Lo esencial de este análisis</strong>
                </div>
                <ul>
                  {selectedArticle.keyTakeaways.map((point) => (
                    <li key={point}>
                      <Icon name="check" size={16} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {selectedArticle.sections.map((section) => (
                <section
                  className="analysis-content-section"
                  key={section.heading}
                >
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.highlight && (
                    <blockquote className="analysis-callout">
                      {section.highlight}
                    </blockquote>
                  )}
                </section>
              ))}

              <section className="analysis-actions-panel">
                <span className="eyebrow">De la información a la acción</span>
                <h2>Cómo aplicar este análisis en tus decisiones</h2>
                <div className="analysis-action-grid">
                  {selectedArticle.actionSteps.map((step, index) => (
                    <div className="analysis-action-card" key={step.title}>
                      <span>0{index + 1}</span>
                      <h3>{step.title}</h3>
                      <p>{step.detail}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <aside className="analysis-detail-sidebar">
              <div className="analysis-sidebar-card dark">
                <span className="eyebrow light">Profundiza el tema</span>
                <h3>Curso recomendado: {selectedArticle.relatedCourseTitle}</h3>
                <p>
                  Aprende paso a paso con ejercicios prácticos y material
                  descargable en el catálogo de LabFinanzas.
                </p>
                <button
                  className="primary coral-button full"
                  onClick={() => navigate("catalog")}
                >
                  Explorar curso en catálogo <Icon name="arrow" size={16} />
                </button>
              </div>

              <div className="analysis-sidebar-card">
                <span className="eyebrow">Informes Claves Financieras</span>
                <h3>¿Quieres seguimiento mensual de estos indicadores?</h3>
                <p>
                  Con la membresía LAB+ accedes a todos los informes
                  descargables, talleres y análisis completos.
                </p>
                <button
                  className="secondary full"
                  onClick={() => navigate("plans")}
                >
                  Ver planes LAB+ <Icon name="arrow" size={16} />
                </button>
              </div>

              <div className="analysis-sidebar-card">
                <span className="eyebrow">Seguir leyendo</span>
                <h3>Otros análisis en Actualidad</h3>
                <div className="analysis-sidebar-links">
                  {otherArticles.map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => onSelectArticle(item.id)}
                    >
                      <small>
                        {item.tag} · {item.time}
                      </small>
                      <strong>{item.title}</strong>
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          <section className="analysis-related-section">
            <div className="section-heading row">
              <div>
                <span className="eyebrow">Continúa explorando</span>
                <h2>Más análisis para tomar mejores decisiones</h2>
              </div>
              <button
                className="text-link"
                onClick={() => onSelectArticle(null)}
              >
                Ver toda la sección de Actualidad <Icon name="arrow" size={18} />
              </button>
            </div>
            <div className="article-grid">
              {otherArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onOpen={() => onSelectArticle(article.id)}
                />
              ))}
            </div>
          </section>
        </article>
        <Footer navigate={navigate} />
      </main>
    )
  }

  return (
    <main>
      <section className="blog-head">
        <span className="eyebrow">Actualidad</span>
        <h1>
          Entender el contexto
          <br />
          también es una inversión.
        </h1>
        <p>
          Análisis, guías y puntos de vista para interpretar lo que pasa y
          decidir con más información.
        </p>
      </section>
      <section
        className="blog-feature"
        onClick={() => onSelectArticle(featuredAnalysis.id)}
      >
        <img src={featuredAnalysis.image} alt={featuredAnalysis.title} />
        <div>
          <span className="badge free">{featuredAnalysis.badge}</span>
          <h2>{featuredAnalysis.title}</h2>
          <p>{featuredAnalysis.excerpt}</p>
          <div className="article-meta">
            <span>{featuredAnalysis.date}</span>
            <span>{featuredAnalysis.time} de lectura</span>
          </div>
          <button
            type="button"
            className="text-link"
            onClick={(event) => {
              event.stopPropagation()
              onSelectArticle(featuredAnalysis.id)
            }}
          >
            Leer análisis completo <Icon name="arrow" />
          </button>
        </div>
      </section>
      <section className="blog-list">
        <div className="filter-pills">
          {["Todos", "Mercados", "Empresas", "Inversiones"].map((item) => (
            <button
              className={filter === item ? "active" : ""}
              onClick={() => setFilter(item)}
              key={item}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="article-grid">
          {articles
            .filter((a) => filter === "Todos" || a.tag === filter)
            .map((article) => (
              <ArticleCard
                key={article.title}
                article={article}
                onOpen={() => onSelectArticle(article.id)}
              />
            ))}
        </div>
      </section>
      <section className="capsules-section">
        <div className="capsules-heading">
          <div className="capsules-title">
            <CategorySymbol type="tv" />
            <div>
              <span className="eyebrow light">Cápsulas informativas</span>
              <h2>
                La actualidad,
                <br />
                explicada en minutos.
              </h2>
            </div>
          </div>
          <p>
            Conversaciones y análisis de Claudio González para entender las
            noticias económicas más relevantes y su impacto en tus decisiones.
          </p>
        </div>
        <div className="capsules-layout">
          <div className="active-capsule">
            <div className="video-frame">
              <iframe
                key={activeVideo.id}
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.id}`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className="active-capsule-copy">
              <span>{activeVideo.tag}</span>
              <h3>{activeVideo.title}</h3>
              <div>
                <small>{activeVideo.source}</small>
                <small>{activeVideo.duration}</small>
              </div>
            </div>
          </div>
          <div className="capsule-playlist">
            <div className="playlist-head">
              <strong>Últimas cápsulas</strong>
              <span>{videoCapsules.length} videos</span>
            </div>
            {videoCapsules.map((video, index) => (
              <button
                className={activeVideo.id === video.id ? "active" : ""}
                onClick={() => setActiveVideo(video)}
                key={video.id}
              >
                <div className="capsule-thumb">
                  <img
                    src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                    alt=""
                  />
                  <span>
                    <Icon name="play" size={14} />
                  </span>
                  <small>{video.duration}</small>
                </div>
                <div>
                  <span>
                    {String(index + 1).padStart(2, "0")} · {video.tag}
                  </span>
                  <strong>{video.title}</strong>
                  <small>{video.source}</small>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="capsules-note">
          <span>
            <Icon name="play" size={16} /> Nuevas cápsulas periódicamente
          </span>
          <p>
            Contenido audiovisual de entrevistas y apariciones de LabFinanzas en
            medios.
          </p>
          <button>
            Ver todas las cápsulas <Icon name="arrow" size={16} />
          </button>
        </div>
      </section>
      <section className="newsletter-band">
        <div>
          <span className="eyebrow light">Sin ruido, directo a tu correo</span>
          <h2>Una idea útil cada semana.</h2>
        </div>
        <div>
          <p>
            Mercados, finanzas personales y decisiones de negocio explicadas con
            claridad.
          </p>
          <div className="email-form">
            <input placeholder="Tu correo electrónico" />
            <button>
              Quiero recibirlo <Icon name="arrow" size={18} />
            </button>
          </div>
        </div>
      </section>
      <Footer navigate={navigate} />
    </main>
  )
}

function Plans({
  navigate,
  startCheckout,
}: {
  navigate: (page: Page) => void
  startCheckout: (item: PurchaseItem) => void
}) {
  const [openFaq, setOpenFaq] = useState(0)
  const memberships = [
    {
      name: "Mensual",
      price: "$9.990",
      detail: "por mes",
      saving: "Flexibilidad total",
      featured: false,
    },
    {
      name: "Trimestral",
      price: "$24.990",
      detail: "cada 3 meses",
      saving: "Ahorras $4.980",
      featured: false,
    },
    {
      name: "Anual",
      price: "$79.990",
      detail: "por año",
      saving: "Ahorras $39.890",
      featured: true,
    },
  ]
  const faqs = [
    [
      "¿Cuál es la diferencia entre membresía y compra individual?",
      "La membresía Lab+ permite acceder a toda la biblioteca mientras esté activa. Una compra individual te da acceso permanente únicamente al curso o informe elegido.",
    ],
    [
      "¿Puedo cambiar de plan más adelante?",
      "Sí. Podrás pasar de un plan mensual a uno trimestral o anual desde tu configuración. El saldo se calculará al momento del cambio.",
    ],
    [
      "¿Cómo recibiré los informes?",
      "Los informes estarán disponibles en tu cuenta y también se enviarán al correo registrado según la periodicidad contratada.",
    ],
    [
      "¿La suscripción se renueva automáticamente?",
      "Sí. Las membresías se renuevan al terminar cada ciclo. Podrás desactivar la renovación en cualquier momento desde tu cuenta.",
    ],
  ]
  return (
    <main>
      <section className="plans-hero">
        <span className="eyebrow light">Planes y formas de pago</span>
        <h1>
          Invierte en información.
          <br />
          Elige cómo acceder.
        </h1>
        <p>
          Compara todas las alternativas de LabFinanzas y encuentra la opción
          que mejor se adapta a tu ritmo y tus objetivos.
        </p>
        <div className="plans-anchor">
          <button
            onClick={() =>
              document.getElementById("membership-detail")?.scrollIntoView()
            }
          >
            Ver membresías
          </button>
          <button
            onClick={() =>
              document.getElementById("reports-detail")?.scrollIntoView()
            }
          >
            Ver informes
          </button>
        </div>
      </section>

      <section className="membership-detail" id="membership-detail">
        <div className="section-heading centered">
          <span className="eyebrow">Membresía Lab+</span>
          <h2>Una membresía, todo el ecosistema</h2>
          <p>
            Todos los planes incluyen los mismos beneficios. Solo cambia la
            frecuencia de cobro y el ahorro.
          </p>
        </div>
        <div className="membership-grid">
          {memberships.map((plan) => (
            <article
              className={plan.featured ? "featured" : ""}
              key={plan.name}
            >
              {plan.featured && (
                <span className="recommended">Mejor precio</span>
              )}
              <h3>{plan.name}</h3>
              <p>{plan.saving}</p>
              <div className="membership-price">
                <strong>{plan.price}</strong>
                <span>{plan.detail}</span>
              </div>
              <ul>
                <li>
                  <Icon name="check" size={16} />
                  Todos los cursos premium
                </li>
                <li>
                  <Icon name="check" size={16} />
                  Informes exclusivos Lab+
                </li>
                <li>
                  <Icon name="check" size={16} />
                  Nuevos contenidos mensuales
                </li>
                <li>
                  <Icon name="check" size={16} />
                  Progreso y recomendaciones
                </li>
              </ul>
              <button
                className={plan.featured ? "primary full" : "outline-action"}
                onClick={() =>
                  startCheckout({
                    kind: "plan",
                    title: `Membresía Lab+ ${plan.name}`,
                    subtitle: `${plan.detail} · Renovación automática`,
                    price: plan.price,
                    planGroup: "membership",
                    billingCycle:
                      plan.name === "Mensual"
                        ? "monthly"
                        : plan.name === "Trimestral"
                          ? "quarterly"
                          : "annual",
                  })
                }
              >
                Elegir plan <Icon name="arrow" size={17} />
              </button>
            </article>
          ))}
        </div>
        <div className="comparison-table">
          <div className="comparison-head">
            <strong>Beneficios incluidos</strong>
            <span>Mensual</span>
            <span>Trimestral</span>
            <span>Anual</span>
          </div>
          {[
            "Acceso completo a cursos",
            "Biblioteca de informes",
            "Certificados de finalización",
            "Historial y progreso",
            "Soporte prioritario",
          ].map((benefit, i) => (
            <div key={benefit}>
              <strong>{benefit}</strong>
              <span>
                <Icon name="check" size={16} />
              </span>
              <span>
                <Icon name="check" size={16} />
              </span>
              <span>
                <Icon name="check" size={16} />
                {i === 4 && <small>Preferente</small>}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="unit-detail">
        <div>
          <span className="eyebrow light">Sin suscripción</span>
          <h2>Compra solo lo que necesitas</h2>
          <p>
            Una alternativa simple para acceder a un curso o informe específico
            sin pagos recurrentes.
          </p>
        </div>
        <div className="unit-cards">
          <article>
            <span>
              <Icon name="book" />
            </span>
            <div>
              <small>Cursos unitarios</small>
              <h3>Acceso permanente</h3>
              <p>
                Incluye lecciones, materiales descargables y futuras
                actualizaciones del curso.
              </p>
              <strong>Desde $19.900</strong>
            </div>
            <button onClick={() => navigate("personal")}>
              Explorar cursos <Icon name="arrow" size={17} />
            </button>
          </article>
          <article>
            <span>
              <Icon name="chart" />
            </span>
            <div>
              <small>Informe individual</small>
              <h3>Compra por edición</h3>
              <p>
                Elige un informe específico y consúltalo cuando quieras desde tu
                biblioteca.
              </p>
              <strong>Desde $6.990</strong>
            </div>
            <button onClick={() => navigate("blog")}>
              Explorar informes <Icon name="arrow" size={17} />
            </button>
          </article>
        </div>
      </section>

      <section className="reports-detail" id="reports-detail">
        <div className="section-heading centered">
          <span className="eyebrow">Informes especializados</span>
          <h2>Información periódica, sin perder el contexto</h2>
          <p>
            Elige la frecuencia que necesita tu planificación. Cada entrega
            llega a tu cuenta y a tu correo.
          </p>
        </div>
        <div className="reports-detail-grid">
          <article>
            <span>Mensual</span>
            <h3>Seguimiento continuo</h3>
            <p>
              Principales movimientos del mes, indicadores relevantes y señales
              para el próximo período.
            </p>
            <strong>
              $6.990 <small>/ mes</small>
            </strong>
            <button
              onClick={() =>
                startCheckout({
                  kind: "plan",
                  title: "Suscripción Informes Mensual",
                  subtitle: "Entrega mensual automática",
                  price: "$6.990",
                  planGroup: "reports",
                  billingCycle: "monthly",
                })
              }
            >
              Contratar mensual
            </button>
          </article>
          <article className="featured">
            <span>Trimestral</span>
            <h3>Visión y tendencias</h3>
            <p>
              Análisis de tendencias, escenarios de mercado y conclusiones para
              decisiones de mediano plazo.
            </p>
            <strong>
              $17.990 <small>/ trimestre</small>
            </strong>
            <button
              onClick={() =>
                startCheckout({
                  kind: "plan",
                  title: "Suscripción Informes Trimestral",
                  subtitle: "Entrega trimestral automática",
                  price: "$17.990",
                  planGroup: "reports",
                  billingCycle: "quarterly",
                })
              }
            >
              Contratar trimestral
            </button>
          </article>
          <article>
            <span>Anual</span>
            <h3>Panorama estratégico</h3>
            <p>
              Balance integral del año, aprendizajes clave y proyecciones para
              el siguiente ciclo financiero.
            </p>
            <strong>
              $49.990 <small>/ año</small>
            </strong>
            <button
              onClick={() =>
                startCheckout({
                  kind: "plan",
                  title: "Suscripción Informes Anual",
                  subtitle: "Entrega anual y especiales",
                  price: "$49.990",
                  planGroup: "reports",
                  billingCycle: "annual",
                })
              }
            >
              Contratar anual
            </button>
          </article>
        </div>
        <div className="delivery-flow">
          <div>
            <span>01</span>
            <strong>Elige una frecuencia</strong>
            <p>Mensual, trimestral o anual.</p>
          </div>
          <Icon name="arrow" />
          <div>
            <span>02</span>
            <strong>Recibe la nueva edición</strong>
            <p>En tu correo y biblioteca.</p>
          </div>
          <Icon name="arrow" />
          <div>
            <span>03</span>
            <strong>Consulta cuando quieras</strong>
            <p>Tu historial queda guardado.</p>
          </div>
        </div>
      </section>

      <section className="payment-methods">
        <div>
          <span className="eyebrow">Pago simple y seguro</span>
          <h2>Tú mantienes el control</h2>
          <p>Información transparente antes de confirmar cualquier compra.</p>
        </div>
        <div className="payment-points">
          <div>
            <Icon name="lock" />
            <span>
              <strong>Pago protegido</strong>
              <small>Transacciones cifradas</small>
            </span>
          </div>
          <div>
            <span className="card-symbol">••••</span>
            <span>
              <strong>Crédito y débito</strong>
              <small>Tarjetas nacionales</small>
            </span>
          </div>
          <div>
            <Icon name="settings" />
            <span>
              <strong>Gestiona tu plan</strong>
              <small>Desde tu configuración</small>
            </span>
          </div>
          <div>
            <Icon name="mail" />
            <span>
              <strong>Comprobante digital</strong>
              <small>Directo a tu correo</small>
            </span>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div>
          <span className="eyebrow">Preguntas frecuentes</span>
          <h2>Antes de elegir</h2>
          <p>Resolvemos las dudas más habituales sobre pagos y acceso.</p>
        </div>
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <article className={openFaq === i ? "open" : ""} key={faq[0]}>
              <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                <strong>{faq[0]}</strong>
                <span>{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && <p>{faq[1]}</p>}
            </article>
          ))}
        </div>
      </section>
      <section className="plans-cta">
        <div>
          <span className="eyebrow light">Empieza cuando quieras</span>
          <h2>Tu próximo paso financiero empieza con una buena decisión.</h2>
        </div>
        <button
          className="primary coral-button"
          onClick={() =>
            startCheckout({
              kind: "plan",
              title: "Membresía Lab+ Anual",
              subtitle: "por año · Renovación automática",
              price: "$79.990",
              planGroup: "membership",
              billingCycle: "annual",
            })
          }
        >
          Elegir mi plan <Icon name="arrow" />
        </button>
      </section>
      <Footer navigate={navigate} />
    </main>
  )
}

function UiKit({ navigate }: { navigate: (page: Page) => void }) {
  const kitNav = [
    "Fundamentos",
    "Tipografía",
    "Componentes",
    "Contenido",
    "Vistas",
    "Inventario",
    "Por definir",
  ]
  const kitIcons: IconName[] = [
    "arrow",
    "book",
    "briefcase",
    "chart",
    "check",
    "clock",
    "eye",
    "lock",
    "mail",
    "play",
    "search",
    "settings",
    "user",
  ]
  const viewCards: { title: string; caption: string; page: Page; kind: string }[] =
    [
      {
        title: "Landing principal",
        caption: "Descubrimiento y propuesta de valor",
        page: "home",
        kind: "landing",
      },
      {
        title: "Empresas",
        caption: "Ruta de aprendizaje por audiencia",
        page: "business",
        kind: "catalog",
      },
      {
        title: "LabFinanzas",
        caption: "Propósito, ecosistema y dirección",
        page: "about",
        kind: "landing",
      },
      {
        title: "Catálogo público",
        caption: "Descubrimiento de cursos",
        page: "catalog",
        kind: "catalog",
      },
      {
        title: "Actualidad",
        caption: "Artículos y cápsulas audiovisuales",
        page: "blog",
        kind: "landing",
      },
      {
        title: "Planes y pagos",
        caption: "Comparación y conversión",
        page: "plans",
        kind: "pricing",
      },
      {
        title: "Checkout",
        caption: "Facturación, pago y confirmación",
        page: "checkout",
        kind: "pricing",
      },
      {
        title: "Mi aprendizaje",
        caption: "Cursos e informes del usuario",
        page: "learning",
        kind: "account",
      },
      {
        title: "Explorar informes",
        caption: "Catálogo y suscripciones de análisis",
        page: "discoverReports",
        kind: "catalog",
      },
      {
        title: "Configuración",
        caption: "Perfil, preferencias y pagos",
        page: "settings",
        kind: "settings",
      },
      {
        title: "Acceso",
        caption: "Ingreso a contenido premium",
        page: "login",
        kind: "login",
      },
    ]
  return (
    <main className="kit-page">
      <section className="kit-intro">
        <div>
          <span className="kit-version">UX/UI KIT · V0.3 · BRAND ROLLOUT</span>
          <h1>
            LabFinanzas
            <br />
            Design Foundation
          </h1>
          <p>
            Sistema visual actualizado con la paleta, composición, fotografía,
            logotipos oficiales y sustituciones tipográficas aprobadas.
          </p>
        </div>
        <div className="kit-meta">
          <div>
            <span>Estado</span>
            <strong>Identidad base aplicada</strong>
          </div>
          <div>
            <span>Plataforma</span>
            <strong>Web responsive</strong>
          </div>
          <div>
            <span>Actualización</span>
            <strong>Junio 2025</strong>
          </div>
        </div>
      </section>
      <nav className="kit-local-nav">
        {kitNav.map((item, i) => (
          <a key={item} href={`#kit-${i}`}>
            {String(i + 1).padStart(2, "0")} {item}
          </a>
        ))}
      </nav>

      <section className="kit-section" id="kit-0">
        <div className="kit-section-head">
          <span>01</span>
          <div>
            <h2>Fundamentos</h2>
            <p>Decisiones base que mantienen coherencia en todo el producto.</p>
          </div>
        </div>
        <div className="kit-foundations">
          <article className="kit-panel grid-demo">
            <div className="kit-panel-title">
              <strong>Retícula responsive</strong>
              <span>12 columnas · Desktop</span>
            </div>
            <div className="columns">
              {Array.from({ length: 12 }).map((_, i) => (
                <i key={i} />
              ))}
            </div>
            <p>Contenedor máximo 1184 · Márgenes fluidos · Gutter 24</p>
          </article>
          <article className="kit-panel">
            <div className="kit-panel-title">
              <strong>Paleta de marca</strong>
              <span>Manual oficial · Agosto 2025</span>
            </div>
            <div className="swatch-grid">
              <div className="swatch brand-indigo">
                <span>Azul profundo</span>
                <small>#1F299C</small>
              </div>
              <div className="swatch brand-violet">
                <span>Violeta</span>
                <small>#6F71F8</small>
              </div>
              <div className="swatch brand-orange">
                <span>Naranjo</span>
                <small>#FE7500</small>
              </div>
              <div className="swatch brand-red">
                <span>Rojo</span>
                <small>#FF3541</small>
              </div>
              <div className="swatch brand-light">
                <span>Gris claro</span>
                <small>#DFDEDE</small>
              </div>
              <div className="swatch brand-gray">
                <span>Gris medio</span>
                <small>#737373</small>
              </div>
            </div>
          </article>
          <article className="kit-panel spacing-demo">
            <div className="kit-panel-title">
              <strong>Escala de espaciado</strong>
              <span>Base 4</span>
            </div>
            <div>
              {[4, 8, 12, 16, 24, 32, 48, 64].map((size) => (
                <span key={size}>
                  <i style={{ width: `${size * 1.5}px` }} />
                  {size}
                </span>
              ))}
            </div>
          </article>
          <article className="kit-panel radius-demo">
            <div className="kit-panel-title">
              <strong>Forma y borde</strong>
              <span>Radio controlado</span>
            </div>
            <div>
              <span className="r4">4</span>
              <span className="r8">8</span>
              <span className="r12">12</span>
              <span className="r16">16</span>
              <span className="rfull">Full</span>
            </div>
            <p>Borde estándar 1px · Contraste neutral</p>
          </article>
        </div>
      </section>

      <section className="kit-section type-section" id="kit-1">
        <div className="kit-section-head">
          <span>02</span>
          <div>
            <h2>Tipografía</h2>
            <p>
              Jerarquía editorial clara para explicar información financiera.
            </p>
          </div>
        </div>
        <div className="brand-font-note"><span>SUSTITUCIONES WEB APROBADAS</span><div><strong>Garet → Outfit</strong><p>Headers, títulos y mensajes destacados.</p></div><div><strong>Telegraf → Space Grotesk</strong><p>Números, precios e indicadores.</p></div><div><strong>Canva Sans → Manrope</strong><p>Cuerpos, controles y lectura continua.</p></div></div>
        <div className="type-family">
          <div>
            <span>Display & headings</span>
            <strong>Aa</strong>
            <h3>Outfit</h3>
            <p>Regular / Bold / ExtraBold · Jerarquía y carácter</p>
          </div>
          <div>
            <span>Body & interface</span>
            <strong>Aa</strong>
            <h3>Manrope</h3>
            <p>Regular / Medium / Bold · Lectura y control</p>
          </div>
          <div className="number-family">
            <span>Numbers & data</span>
            <strong>01</strong>
            <h3>Space Grotesk</h3>
            <p>Regular / Bold · Precios, cifras e indicadores</p>
          </div>
        </div>
        <div className="type-scale">
          {[
            ["Display 01", "Entiende tus finanzas.", "64 / 68 · Bold"],
            ["Heading 01", "Decide con confianza.", "46 / 52 · Bold"],
            [
              "Heading 02",
              "Contenido que se adapta a ti",
              "32 / 38 · Semibold",
            ],
            [
              "Heading 03",
              "Tu primera cartera de inversión",
              "20 / 28 · Semibold",
            ],
            [
              "Body Large",
              "Información clara para tomar mejores decisiones.",
              "18 / 30 · Regular",
            ],
            [
              "Body",
              "Aprende a organizar, ahorrar e invertir a tu propio ritmo.",
              "14 / 22 · Regular",
            ],
            ["Label", "CONTENIDO PREMIUM", "11 / 14 · Bold"],
          ].map((row, i) => (
            <div className={`type-row t${i}`} key={row[0]}>
              <span>{row[0]}</span>
              <p>{row[1]}</p>
              <small>{row[2]}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="kit-section" id="kit-2">
        <div className="kit-section-head">
          <span>03</span>
          <div>
            <h2>Componentes</h2>
            <p>Primitivas reutilizables y sus estados principales.</p>
          </div>
        </div>
        <div className="component-board">
          <article className="kit-panel buttons-sample">
            <div className="kit-panel-title">
              <strong>Botones</strong>
              <span>Default · Hover · Disabled</span>
            </div>
            <div>
              <button className="primary">
                Acción principal <Icon name="arrow" size={17} />
              </button>
              <button className="outline-action">Acción secundaria</button>
              <button className="text-link">
                Acción de texto <Icon name="arrow" size={16} />
              </button>
              <button className="primary disabled">No disponible</button>
            </div>
          </article>
          <article className="kit-panel form-sample">
            <div className="kit-panel-title">
              <strong>Campos y controles</strong>
              <span>Estados de formulario</span>
            </div>
            <div>
              <label>
                Correo electrónico
                <input placeholder="nombre@correo.com" />
              </label>
              <label>
                Estado completo
                <input defaultValue="usuario@labfinanzas.cl" />
              </label>
              <label className="error">
                Estado error
                <input defaultValue="correo incorrecto" />
                <small>Ingresa un correo válido</small>
              </label>
            </div>
          </article>
          <article className="kit-panel chips-sample">
            <div className="kit-panel-title">
              <strong>Etiquetas y estados</strong>
              <span>Clasificación</span>
            </div>
            <div>
              <span className="badge premium">
                <Icon name="lock" size={12} /> Premium
              </span>
              <span className="badge free">Acceso gratuito</span>
              <span className="status-chip">En progreso</span>
              <span className="status-chip dark">Completado</span>
              <span className="status-chip outline">Guardado</span>
            </div>
          </article>
          <article className="kit-panel icon-sample">
            <div className="kit-panel-title">
              <strong>Iconografía</strong>
              <span>Trazo 1.8 · 24 × 24</span>
            </div>
            <div>
              {kitIcons.map((icon) => (
                <span key={icon}>
                  <Icon name={icon} />
                  <small>{icon}</small>
                </span>
              ))}
            </div>
          </article>
          <article className="kit-panel nav-sample">
            <div className="kit-panel-title">
              <strong>Navegación</strong>
              <span>Header & tabs</span>
            </div>
            <div className="sample-header">
              <Logo />
              <div>
                <span className="active">Inicio</span>
                <span>Aprende</span>
                <span>Actualidad</span>
              </div>
              <button className="primary small">Explorar</button>
            </div>
            <div className="sample-tabs">
              <span className="active">Mis cursos</span>
              <span>Mis informes</span>
              <span>Guardados</span>
            </div>
          </article>
        </div>
      </section>

      <section className="kit-section" id="kit-3">
        <div className="kit-section-head">
          <span>04</span>
          <div>
            <h2>Componentes de contenido</h2>
            <p>Patrones principales del ecosistema educativo y premium.</p>
          </div>
        </div>
        <div className="content-components">
          <div>
            <span className="kit-caption">COURSE CARD</span>
            <CourseCard
              course={courses[1]}
              onOpen={() => navigate("personal")}
            />
          </div>
          <div>
            <span className="kit-caption">ARTICLE CARD</span>
            <ArticleCard
              article={articles[0]}
              onOpen={() => navigate("blog")}
            />
          </div>
          <div>
            <span className="kit-caption">REPORT ROW</span>
            <div className="kit-report-row">
              <div className="report-cover">
                <Icon name="chart" size={20} />
                <span>
                  LAB
                  <br />
                  INFORME
                </span>
              </div>
              <div>
                <span className="eyebrow small">Informe mensual</span>
                <h3>Panorama de mercados</h3>
                <p>14 Jun 2025 · 24 páginas</p>
              </div>
              <span className="status-chip">Nuevo</span>
              <button>
                <Icon name="eye" size={16} /> Leer
              </button>
            </div>
          </div>
          <div>
            <span className="kit-caption">PLAN CARD</span>
            <article className="kit-plan-card">
              <span className="recommended">Recomendado</span>
              <small>PLAN ANUAL</small>
              <div>
                <strong>$79.990</strong>
                <span>/ año</span>
              </div>
              <p>Acceso completo al ecosistema LabFinanzas.</p>
              <ul>
                <li>
                  <Icon name="check" size={15} />
                  Todos los cursos premium
                </li>
                <li>
                  <Icon name="check" size={15} />
                  Informes exclusivos
                </li>
              </ul>
              <button className="primary full">Elegir plan</button>
            </article>
          </div>
        </div>
      </section>

      <section className="kit-section kit-views" id="kit-4">
        <div className="kit-section-head">
          <span>05</span>
          <div>
            <h2>Mapa de vistas</h2>
            <p>Pantallas principales construidas con el sistema actual.</p>
          </div>
        </div>
        <div className="view-gallery">
          {viewCards.map((view) => (
            <button key={view.title} onClick={() => navigate(view.page)}>
              <div className={`view-thumbnail ${view.kind}`}>
                <span className="browser-bar">
                  <i />
                  <i />
                  <i />
                </span>
                <div className="wire-nav" />
                <div className="wire-layout">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              </div>
              <span className="view-number">
                {String(viewCards.indexOf(view) + 1).padStart(2, "0")}
              </span>
              <strong>{view.title}</strong>
              <small>{view.caption}</small>
              <Icon name="arrow" size={17} />
            </button>
          ))}
        </div>
      </section>

      <section className="kit-section" id="kit-5">
        <div className="kit-section-head">
          <span>06</span>
          <div>
            <h2>Inventario del producto</h2>
            <p>
              Qué contiene actualmente el sitio y qué objetivo cumple cada área.
            </p>
          </div>
        </div>
        <div className="product-inventory">
          {[
            {
              group: "Sitio público",
              items: [
                [
                  "Inicio",
                  "Propuesta de valor, audiencias, cursos, planes y actualidad",
                  "Construido",
                ],
                [
                  "LabFinanzas",
                  "Ecosistema, director, propósito, formatos y valores",
                  "Construido",
                ],
                [
                  "Catálogo",
                  "Exploración de cursos gratuitos y premium",
                  "Construido",
                ],
                [
                  "Actualidad",
                  "Artículos, informes destacados y cápsulas audiovisuales",
                  "Construido",
                ],
                [
                  "Planes y pagos",
                  "Membresías, compras unitarias e informes periódicos",
                  "Construido",
                ],
              ],
            },
            {
              group: "Área privada",
              items: [
                [
                  "Explorar cursos",
                  "Catálogo personalizado y recomendaciones",
                  "Construido",
                ],
                [
                  "Explorar informes",
                  "Informes mensuales, trimestrales y especiales",
                  "Construido",
                ],
                [
                  "Mi aprendizaje",
                  "Cursos en progreso e informes adquiridos",
                  "Construido",
                ],
                [
                  "Historial",
                  "Actividad y continuidad de aprendizaje",
                  "Construido",
                ],
                [
                  "Configuración",
                  "Perfil, avatar, plan, preferencias, seguridad y pagos",
                  "Construido",
                ],
              ],
            },
            {
              group: "Conversión y soporte",
              items: [
                ["Login", "Acceso al contenido y cuenta premium", "Mockup"],
                [
                  "Checkout",
                  "Facturación, medio de pago, resumen y confirmación",
                  "Construido",
                ],
                [
                  "Detalle de contenido",
                  "Ficha completa de curso, informe o artículo",
                  "Pendiente",
                ],
                [
                  "Ayuda y contacto",
                  "FAQ, soporte y canales de atención",
                  "Pendiente",
                ],
                [
                  "Estados del sistema",
                  "Vacíos, errores, carga y confirmaciones",
                  "Pendiente",
                ],
              ],
            },
          ].map((section) => (
            <article key={section.group}>
              <div className="inventory-title">
                <h3>{section.group}</h3>
                <span>{section.items.length} áreas</span>
              </div>
              {section.items.map((item) => (
                <div className="inventory-row" key={item[0]}>
                  <strong>{item[0]}</strong>
                  <p>{item[1]}</p>
                  <span className={`inventory-status ${item[2].toLowerCase()}`}>
                    {item[2]}
                  </span>
                </div>
              ))}
            </article>
          ))}
        </div>
        <div className="content-matrix">
          <div className="kit-panel-title">
            <strong>Matriz de contenidos</strong>
            <span>Propietarios y frecuencia sugerida</span>
          </div>
          <div className="matrix-head">
            <span>Tipo</span>
            <span>Formato</span>
            <span>Frecuencia</span>
            <span>Acceso</span>
            <span>Estado editorial</span>
          </div>
          {[
            [
              "Cursos",
              "Video + material",
              "Mensual",
              "Gratis / Premium",
              "Contenido de ejemplo",
            ],
            [
              "Informes",
              "PDF + lectura web",
              "Mes / trimestre / año",
              "Compra / Suscripción",
              "Estructura definida",
            ],
            [
              "Artículos",
              "Lectura editorial",
              "Semanal",
              "Público",
              "Contenido de ejemplo",
            ],
            [
              "Cápsulas",
              "Video / entrevista",
              "Periódica",
              "Público",
              "Contenido original integrado",
            ],
            [
              "Talleres",
              "Sesión audiovisual",
              "Por calendario",
              "Compra / Premium",
              "Falta catálogo",
            ],
          ].map((row) => (
            <div className="matrix-row" key={row[0]}>
              {row.map((cell) => (
                <span key={cell}>{cell}</span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="kit-section pending-section" id="kit-6">
        <div className="kit-section-head">
          <span>07</span>
          <div>
            <h2>Decisiones por definir</h2>
            <p>
              Checklist para completar la identidad y pasar a un producto listo
              para desarrollo y publicación.
            </p>
          </div>
        </div>
        <div className="definition-progress">
          <div>
            <span>Definición general estimada</span>
            <strong>58%</strong>
          </div>
          <div>
            <i />
          </div>
          <p>
            La arquitectura, los flujos y el sistema visual base están avanzados.
            Los archivos de marca, el contenido final y las reglas de negocio
            siguen abiertos.
          </p>
        </div>
        <div className="pending-grid">
          {[
            {
              title: "Identidad y estética",
              progress: "55%",
              priority: "Alta",
              items: [
                "Archivos vectoriales del isologotipo",
                "Archivos y licencias de tipografías oficiales",
                "Validación de contraste con la paleta final",
                "Biblioteca definitiva de símbolos",
                "Selección fotográfica propia y microinteracciones",
              ],
            },
            {
              title: "Contenido y editorial",
              progress: "35%",
              priority: "Alta",
              items: [
                "Inventario real de cursos y talleres",
                "Temarios, profesores y duraciones",
                "Calendario de informes y responsables",
                "Política de contenido gratuito vs. premium",
                "Guía de tono, estilo y revisión financiera",
              ],
            },
            {
              title: "Producto y negocio",
              progress: "55%",
              priority: "Crítica",
              items: [
                "Precios y moneda definitivos",
                "Beneficios exactos de cada plan",
                "Renovación, cancelación y reembolsos",
                "Reglas de compra unitaria",
                "Certificados, progreso y vigencia de acceso",
              ],
            },
            {
              title: "Cuenta y personalización",
              progress: "60%",
              priority: "Media",
              items: [
                "Roles y permisos de usuario",
                "Lógica de recomendaciones",
                "Preferencias y frecuencia de avisos",
                "Favoritos, listas y contenido guardado",
                "Privacidad, exportación y eliminación de datos",
              ],
            },
            {
              title: "Tecnología e integraciones",
              progress: "15%",
              priority: "Crítica",
              items: [
                "CMS y modelo de contenidos",
                "Pasarela de pago y facturación",
                "Plataforma de video y protección",
                "Envío de correos e informes",
                "Analítica, SEO, seguridad y rendimiento",
              ],
            },
            {
              title: "Accesibilidad y calidad",
              progress: "30%",
              priority: "Alta",
              items: [
                "Contraste con paleta definitiva",
                "Navegación por teclado y foco",
                "Subtítulos y transcripciones",
                "Pruebas con usuarios",
                "Estados vacíos, error, carga y offline",
              ],
            },
          ].map((group) => (
            <article key={group.title}>
              <div className="pending-card-head">
                <span>{group.priority}</span>
                <strong>{group.progress}</strong>
              </div>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>
                    <i />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="roadmap-board">
          <div className="kit-panel-title">
            <strong>Hoja de ruta sugerida</strong>
            <span>Orden de decisión</span>
          </div>
          <div className="roadmap-steps">
            {[
              [
                "01",
                "Definir negocio",
                "Planes, precios, reglas y alcance del MVP",
              ],
              [
                "02",
                "Cerrar contenido",
                "Inventario, responsables y calendario editorial",
              ],
              [
                "03",
                "Aplicar identidad",
                "Marca, tokens visuales, imágenes y motion",
              ],
              [
                "04",
                "Prototipar flujos",
                "Checkout, contenido, soporte y estados críticos",
              ],
              [
                "05",
                "Validar",
                "Accesibilidad, pruebas con usuarios y métricas",
              ],
            ].map((step) => (
              <div key={step[0]}>
                <span>{step[0]}</span>
                <strong>{step[1]}</strong>
                <p>{step[2]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="kit-handoff">
        <div>
          <span>HANDOFF NOTE</span>
          <h2>Preparado para evolucionar a identidad visual.</h2>
          <p>
            Los tokens monocromáticos se encuentran centralizados para
            reemplazar color, elevación y personalidad sin alterar la estructura
            de los componentes.
          </p>
        </div>
        <button className="light-button" onClick={() => navigate("home")}>
          Ver producto actual <Icon name="arrow" />
        </button>
      </section>
    </main>
  )
}

function Checkout({
  items,
  navigate,
  onComplete,
}: {
  items: PurchaseItem[]
  navigate: (page: Page) => void
  onComplete: () => void
}) {
  const [orderItems] = useState(items)
  const firstItem = orderItems[0]
  const isSubscription = firstItem.kind === "plan"
  const subscriptionGroup = firstItem.planGroup ?? "membership"
  const [billingCycle, setBillingCycle] = useState<
    "annual" | "quarterly" | "monthly"
  >(firstItem.billingCycle ?? "annual")
  const subscriptionConfig = subscriptionCatalog[subscriptionGroup]
  const selectedPlan = subscriptionConfig.options[billingCycle]
  const orderTotal = isSubscription
    ? selectedPlan.price
    : purchaseTotal(orderItems)
  const [paymentMethod, setPaymentMethod] = useState<"card" | "webpay">("card")
  const [authStep, setAuthStep] = useState<"email" | "code" | "payment">("email")
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [completed, setCompleted] = useState(false)
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const codeIsValid = /^\d{6}$/.test(code)

  const continueWithSocial = (provider: string) => {
    setEmail(`demo.${provider.toLowerCase()}@labfinanzas.cl`)
    setAuthStep("payment")
  }

  if (completed) {
    return (
      <main className="checkout-success">
        <div className="success-card">
          <span className="success-icon"><Icon name="check" size={32} /></span>
          <span className="eyebrow">Pago confirmado</span>
          <h1>Tu compra está lista.</h1>
          <p>Enviamos el comprobante y los detalles de acceso a <strong>{email}</strong>.</p>
          <div className="success-order"><div><span>{orderItems.length === 1 ? "Producto" : "Productos"}</span><strong>{isSubscription ? selectedPlan.title : orderItems.map((item) => item.title).join(", ")}</strong></div><div><span>Total pagado</span><strong>{orderTotal}</strong></div><div><span>N.º de orden</span><strong>LF-250614-0842</strong></div></div>
          <button className="primary full" onClick={() => navigate(firstItem.kind === "plan" ? "history" : "learning")}>{firstItem.kind === "plan" ? "Ir a Mi cuenta" : "Ir a mi biblioteca"} <Icon name="arrow" /></button>
          <button className="checkout-back" onClick={() => navigate("home")}>Volver al inicio</button>
        </div>
      </main>
    )
  }
  return (
    <main className="checkout-page">
      <header className="checkout-header">
        <button className="logo-button" onClick={() => navigate("home")}><Logo /></button>
        <button className="checkout-cancel" onClick={() => navigate(firstItem.kind === "plan" ? "plans" : "catalog")}>Cancelar</button>
      </header>
      <div className="checkout-layout">
        <section className="checkout-form">
          <h1>{isSubscription ? subscriptionConfig.heading : "Pagar"}</h1>
          {isSubscription && (
            <section className="subscription-plan-box">
              <div className="subscription-plan-options">
                {(
                  ["annual", "quarterly", "monthly"] as (
                    | "annual"
                    | "quarterly"
                    | "monthly"
                  )[]
                ).map((cycle) => {
                  const option = subscriptionConfig.options[cycle]
                  const active = billingCycle === cycle
                  return (
                    <button
                      type="button"
                      key={cycle}
                      className={active ? "active" : ""}
                      onClick={() => setBillingCycle(cycle)}
                    >
                      <div className="subscription-option-top">
                        <span className="payment-radio"><i /></span>
                        <strong>{option.label}</strong>
                      </div>
                      {option.badge && (
                        <span className="subscription-value-badge">
                          {option.badge}
                        </span>
                      )}
                      <div className="subscription-monthly-rate">
                        <b>{option.monthlyEquivalent}</b>
                        {option.originalMonthly && (
                          <s>{option.originalMonthly}</s>
                        )}
                      </div>
                      <p>
                        {option.price}{" "}
                        {option.originalPrice !== option.price && (
                          <s>{option.originalPrice}</s>
                        )}{" "}
                        · {option.billingNote}
                      </p>
                    </button>
                  )
                })}
              </div>
              <div className="subscription-includes">
                <strong>Qué incluye</strong>
                <ul>
                  {subscriptionConfig.includes.map((benefit) => (
                    <li key={benefit}>
                      <Icon name="check" size={16} />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}
          <section className="checkout-account">
            <div className="checkout-section-heading">
              <strong>1. {authStep === "payment" ? "Detalles de la cuenta" : "Inicia sesión o crea una cuenta"}</strong>
              {authStep === "payment" && <span className="verified-account">{email} <i><Icon name="check" size={12} /></i></span>}
            </div>
            {authStep === "email" && (
              <form className="checkout-auth-form" onSubmit={(event) => { event.preventDefault(); if (emailIsValid) setAuthStep("code") }}>
                <p>Necesitas una cuenta de LabFinanzas para acceder a los contenidos que has adquirido. Usaremos tu correo para enviarte la confirmación del pedido.</p>
                <div className="checkout-email-row">
                  <label>Correo electrónico<input autoFocus type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="nombre@correo.com" /></label>
                  <span>o</span>
                  <div className="checkout-socials">
                    {["Google", "Facebook", "Apple"].map((provider) => <button type="button" key={provider} aria-label={`Continuar con ${provider}`} onClick={() => continueWithSocial(provider)}>{provider === "Google" ? "G" : provider === "Facebook" ? "f" : "A"}</button>)}
                  </div>
                </div>
                <small>No se necesita contraseña</small>
                <button className="checkout-continue" disabled={!emailIsValid}>Continuar</button>
              </form>
            )}
            {authStep === "code" && (
              <form className="checkout-code-form" onSubmit={(event) => { event.preventDefault(); if (codeIsValid) setAuthStep("payment") }}>
                <p>¡Hola de nuevo! Introduce el código de 6 dígitos que hemos enviado a <strong>{email}</strong>. <button type="button" onClick={() => { setCode(""); setAuthStep("email") }}>Cambiar correo electrónico</button></p>
                <label>Código de 6 dígitos<div><input autoFocus inputMode="numeric" maxLength={6} value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, ""))} placeholder="000000" /><Icon name="lock" size={17} /></div></label>
                <span className="demo-code">Simulación: usa cualquier código de 6 dígitos.</span>
                <button className="checkout-continue" disabled={!codeIsValid}>Continuar a la página de pago</button>
                <button type="button" className="checkout-resend" onClick={() => setCode("")}>Volver a enviar el código</button>
              </form>
            )}
          </section>

          <section className={`checkout-payment-section ${authStep !== "payment" ? "locked" : ""}`}>
            <div className="checkout-section-heading">
              <strong>2. Dirección de facturación y método de pago</strong>
              {authStep !== "payment" && <Icon name="lock" size={16} />}
            </div>
            {authStep === "payment" && (
              <div className="checkout-payment-content">
                <div className="checkout-fields"><label>País o región<select defaultValue="Chile"><option>Chile</option><option>Argentina</option><option>Perú</option><option>Colombia</option></select></label><label>Nombre completo<input placeholder="Nombre y apellido" /></label><label className="full-field">RUT o identificación<input placeholder="12.345.678-9" /></label></div>
                <div className="payment-selector">
                  <button className={paymentMethod === "card" ? "active" : ""} onClick={() => setPaymentMethod("card")}><span className="payment-radio"><i /></span><span><strong>Tarjeta de crédito o débito</strong><small>Visa · Mastercard · American Express</small></span><b>••••</b></button>
                  <button className={paymentMethod === "webpay" ? "active" : ""} onClick={() => setPaymentMethod("webpay")}><span className="payment-radio"><i /></span><span><strong>Webpay</strong><small>Continúa en el portal seguro de Transbank</small></span><b>W</b></button>
                </div>
                {paymentMethod === "card" ? (
                  <div className="card-form">
                    <label className="full-field">Número de tarjeta<div className="input-with-icon"><input placeholder="1234 5678 9012 3456" /><Icon name="lock" size={15} /></div></label>
                    <label>Fecha de vencimiento<input placeholder="MM / AA" /></label>
                    <label>Código de seguridad<input placeholder="CVV" /></label>
                    <label className="full-field">Nombre en la tarjeta<input placeholder="Como aparece en la tarjeta" /></label>
                  </div>
                ) : <div className="webpay-message"><span>W</span><p>Al confirmar, te redirigiremos a Webpay para terminar el pago de forma segura.</p></div>}
              </div>
            )}
          </section>
          {authStep === "payment" && <div className="checkout-trust"><span><Icon name="lock" size={17} /><strong>Pago protegido</strong></span><p>La información se transmite cifrada. LabFinanzas no almacena los datos completos de tu tarjeta.</p></div>}
        </section>
        <aside className="order-summary">
          <h2>{isSubscription ? "Resumen" : "Resumen del pedido"}</h2>
          {isSubscription ? (
            <div className="subscription-summary">
              <div className="subscription-due-today">
                <span>Total a pagar hoy:</span>
                <strong>{selectedPlan.price} CLP$</strong>
              </div>
              <div className="order-lines">
                <div>
                  <span>{selectedPlan.label}:</span>
                  <strong>
                    {selectedPlan.originalPrice} CLP$ {selectedPlan.cadenceLabel}
                  </strong>
                </div>
                {selectedPlan.discount !== "$0" && (
                  <div className="subscription-discount">
                    <span>Ahorro por frecuencia:</span>
                    <strong>
                      {selectedPlan.discount} CLP$ {selectedPlan.cadenceLabel}
                    </strong>
                  </div>
                )}
              </div>
              <div className="subscription-renewal">
                <div>
                  <strong>Desde el {selectedPlan.renewalDate}:</strong>
                  <b>{selectedPlan.price} CLP$</b>
                </div>
                <div>
                  <span>{selectedPlan.label}:</span>
                  <span>
                    {selectedPlan.price} CLP$ {selectedPlan.cadenceLabel}
                  </span>
                </div>
              </div>
              <p className="subscription-cancel-note">
                <strong>Puedes cancelar en cualquier momento</strong> visitando
                la página Suscripciones de tu cuenta.
              </p>
              <p className="order-terms">
                Tu suscripción comenzará hoy por {selectedPlan.price} CLP${" "}
                {selectedPlan.cadenceLabel} y se renovará automáticamente hasta
                que la canceles antes del siguiente período de facturación.
              </p>
            </div>
          ) : (
            <>
              <div className="checkout-products">
                {orderItems.map((item) => (
                  <div className="checkout-product" key={item.title}>
                    {item.image ? (
                      <img src={item.image} alt="" />
                    ) : (
                      <span className="checkout-plan-icon">
                        {item.code ?? "IF"}
                      </span>
                    )}
                    <div><small>{item.kind === "report" ? "INFORME DIGITAL" : "CURSO ONLINE"}</small><strong>{item.title}</strong><p>{item.subtitle}</p><b>{item.price}</b></div>
                  </div>
                ))}
              </div>
              <button className="checkout-explore" onClick={() => navigate("catalog")}>
                <span>+</span> Explorar contenido
              </button>
              <div className="order-lines"><div><span>Productos ({orderItems.length})</span><strong>{orderTotal}</strong></div><div><span>Descuento</span><strong>$0</strong></div></div>
              <div className="order-total"><span>Total</span><div><strong>{orderTotal}</strong><small>CLP</small></div></div>
            </>
          )}
          {authStep === "payment" && <>
            {!isSubscription && <p className="order-terms">Al completar tu compra aceptas los términos de uso y la política de privacidad de LabFinanzas.</p>}
            <button className="primary full checkout-pay" onClick={() => { setCompleted(true); onComplete() }}><Icon name="lock" size={16} /> Pagar {orderTotal}</button>
            <div className="checkout-guarantee"><Icon name="check" size={15} /><span><strong>Acceso inmediato</strong><small>{firstItem.kind === "plan" ? "Tu membresía se activará al confirmar." : "Tus compras quedarán disponibles en Mi aprendizaje."}</small></span></div>
          </>}
        </aside>
      </div>
    </main>
  )
}

function Login({ navigate }: { navigate: (page: Page) => void }) {
  const [mode, setMode] = useState<"login" | "register">("login")
  const [show, setShow] = useState(false)
  const [interest, setInterest] = useState<"personal" | "business">("personal")
  const [registerEmail, setRegisterEmail] = useState("")
  const [accessSent, setAccessSent] = useState(false)
  const targetEmail = registerEmail.trim() || "tu@correo.com"

  const switchMode = (nextMode: "login" | "register") => {
    setMode(nextMode)
    setAccessSent(false)
  }
  return (
    <main className="login-page">
      <div className="login-aside">
        <button
          className="logo-button light-logo"
          onClick={() => navigate("home")}
        >
          <Logo variant="white" />
        </button>
        <div>
          <span className="eyebrow light">Tu espacio financiero</span>
          <h1>
            {mode === "login"
              ? "Continúa construyendo lo que empezaste."
              : "Empieza a tomar decisiones con claridad."}
          </h1>
          <p>
            {mode === "login"
              ? "Accede a tus cursos, informes guardados y recomendaciones personalizadas."
              : "Crea tu cuenta en menos de un minuto para guardar tu avance, acceder a cursos gratuitos y personalizar tu ruta."}
          </p>
        </div>
        <div className="testimonial">
          <p>“Ahora entiendo qué estoy mirando antes de tomar una decisión.”</p>
          <span>Carolina M. · Alumna LabFinanzas</span>
        </div>
      </div>
      <div className="login-panel">
        <div className="login-box">
          <span className="mobile-logo">
            <Logo />
          </span>
          <div className="auth-mode-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={mode === "login"}
              className={mode === "login" ? "active" : ""}
              onClick={() => switchMode("login")}
            >
              Iniciar sesión
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "register"}
              className={mode === "register" ? "active" : ""}
              onClick={() => switchMode("register")}
            >
              Crear cuenta
            </button>
          </div>
          {mode === "register" && accessSent ? (
            <div className="register-sent-box">
              <span className="register-sent-icon">
                <Icon name="mail" size={24} />
              </span>
              <h2>Valida tu cuenta en tu correo</h2>
              <p>
                Hemos creado tu cuenta. Te enviamos un enlace de validación a{" "}
                <strong>{targetEmail}</strong> para activar tu acceso.
              </p>
              <div className="register-sent-note">
                <Icon name="check" size={15} />
                <span>
                  Abre el enlace enviado a tu correo electrónico para validar la
                  cuenta y luego inicia sesión con tu correo y contraseña.
                </span>
              </div>
              <button
                className="primary full"
                onClick={() => switchMode("login")}
              >
                Ir a iniciar sesión <Icon name="arrow" />
              </button>
              <div className="register-sent-actions">
                <button type="button" onClick={() => setAccessSent(false)}>
                  Corregir correo electrónico
                </button>
              </div>
            </div>
          ) : (
            <>
              <h2>
                {mode === "login" ? "Bienvenido de vuelta" : "Crea tu cuenta"}
              </h2>
              <p>
                {mode === "login"
                  ? "Ingresa tus datos para continuar."
                  : "Completa tus datos y te enviaremos un enlace a tu correo para validar tu cuenta."}
              </p>
              <button
                className="social-button"
                onClick={() =>
                  mode === "login" ? navigate("history") : setAccessSent(true)
                }
              >
                <span>G</span>
                {mode === "login"
                  ? "Continuar con Google"
                  : "Registrarme con Google"}
              </button>
              <div className="divider">
                <span>
                  {mode === "login"
                    ? "o continúa con tu correo"
                    : "o regístrate con tu correo"}
                </span>
              </div>
              {mode === "register" && (
                <>
                  <div className="register-name-grid">
                    <label>
                      Nombre
                      <input type="text" placeholder="Camila" />
                    </label>
                    <label>
                      Apellido
                      <input type="text" placeholder="Soto" />
                    </label>
                  </div>
                  <div className="register-interest">
                    <span>¿Qué te interesa aprender primero?</span>
                    <div>
                      <button
                        type="button"
                        className={interest === "personal" ? "active" : ""}
                        onClick={() => setInterest("personal")}
                      >
                        <Icon name="chart" size={15} /> Inversiones personales
                      </button>
                      <button
                        type="button"
                        className={interest === "business" ? "active" : ""}
                        onClick={() => setInterest("business")}
                      >
                        <Icon name="briefcase" size={15} /> Empresas y negocios
                      </button>
                    </div>
                  </div>
                </>
              )}
              <label>
                Correo electrónico
                {mode === "login" ? (
                  <input
                    type="email"
                    placeholder="nombre@correo.com"
                    defaultValue="demo@labfinanzas.cl"
                  />
                ) : (
                  <input
                    type="email"
                    placeholder="nombre@correo.com"
                    value={registerEmail}
                    onChange={(event) => setRegisterEmail(event.target.value)}
                  />
                )}
              </label>
              <label>
                Contraseña
                <div className="password-field">
                  <input
                    type={show ? "text" : "password"}
                    placeholder={
                      mode === "login"
                        ? "Tu contraseña"
                        : "Crea una contraseña (mínimo 8 caracteres)"
                    }
                    defaultValue={mode === "login" ? "labfinanzas" : ""}
                  />
                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    aria-label="Mostrar contraseña"
                  >
                    <Icon name="eye" size={18} />
                  </button>
                </div>
              </label>
              {mode === "login" ? (
                <div className="login-options">
                  <label>
                    <input type="checkbox" defaultChecked /> Recordarme
                  </label>
                  <button type="button">¿Olvidaste tu contraseña?</button>
                </div>
              ) : (
                <label className="register-terms">
                  <input type="checkbox" defaultChecked />
                  <span>
                    Acepto los términos de uso y la política de privacidad de
                    LabFinanzas.
                  </span>
                </label>
              )}
              <button
                className="primary full"
                onClick={() =>
                  mode === "login" ? navigate("history") : setAccessSent(true)
                }
              >
                {mode === "login" ? "Iniciar sesión" : "Crear mi cuenta"}{" "}
                <Icon name="arrow" />
              </button>
              <p className="signup-copy">
                {mode === "login" ? (
                  <>
                    ¿Aún no tienes una cuenta?{" "}
                    <button
                      type="button"
                      onClick={() => switchMode("register")}
                    >
                      Crear cuenta
                    </button>
                  </>
                ) : (
                  <>
                    ¿Ya tienes una cuenta?{" "}
                    <button type="button" onClick={() => switchMode("login")}>
                      Iniciar sesión
                    </button>
                  </>
                )}
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  )
}

function Dashboard({
  page,
  navigate,
}: {
  page: "discover" | "discoverReports" | "learning" | "history" | "notifications" | "settings"
  navigate: (page: Page) => void
}) {
  const menu: { key: Page; label: string; icon: IconName }[] = [
    { key: "discover", label: "Explorar cursos", icon: "search" },
    { key: "discoverReports", label: "Explorar informes", icon: "chart" },
    { key: "learning", label: "Mi aprendizaje", icon: "book" },
    { key: "history", label: "Mi historial", icon: "clock" },
    { key: "notifications", label: "Notificaciones", icon: "mail" },
    { key: "settings", label: "Configuración", icon: "settings" },
  ]
  return (
    <main className="account-layout">
      <aside className="account-sidebar">
        <button className="logo-button" onClick={() => navigate("home")}>
          <Logo />
        </button>
        <div className="account-user">
          <span>CS</span>
          <div>
            <strong>Camila Soto</strong>
            <small>Plan Premium</small>
          </div>
        </div>
        <nav>
          {menu.map((item) => (
            <button
              key={item.key}
              className={page === item.key ? "active" : ""}
              onClick={() => navigate(item.key)}
            >
              <Icon name={item.icon} size={19} />
              {item.label}
              {item.key === "notifications" && <b>3</b>}
            </button>
          ))}
        </nav>
        <button className="back-home" onClick={() => navigate("home")}>
          <Icon name="arrow" size={18} /> Volver al sitio
        </button>
      </aside>
      {page === "discover" ? (
        <section className="account-discover">
          <CourseBrowser account navigate={navigate} />
        </section>
      ) : page === "discoverReports" ? (
        <section className="account-discover">
          <ReportBrowser navigate={navigate} />
        </section>
      ) : (
        <section className="account-main">
          <div className="account-top">
            <div>
              <span className="eyebrow">Mi cuenta</span>
              <h1>
                {page === "learning"
                  ? "Mi aprendizaje"
                  : page === "history"
                    ? "Mi historial"
                    : page === "notifications"
                      ? "Notificaciones"
                      : "Configuración"}
              </h1>
            </div>
            <button className="avatar-button">CS</button>
          </div>
          {page === "learning" && <MyLearning />}
          {page === "history" && <History />}
          {page === "notifications" && <Notifications />}
          {page === "settings" && <Settings />}
        </section>
      )}
    </main>
  )
}

function ReportBrowser({
  navigate,
  publicMode = false,
  addToCart,
  cartItems = [],
}: {
  navigate: (page: Page) => void
  publicMode?: boolean
  addToCart?: (item: PurchaseItem) => void
  cartItems?: PurchaseItem[]
}) {
  const [reportFilter, setReportFilter] = useState("Todos")
  const reports = [
    {
      type: "Mensual",
      topic: "Mercados",
      title: "Panorama de mercados · Junio 2025",
      description:
        "Tasas, dólar, inflación y principales movimientos que marcaron el mes.",
      pages: "24 páginas",
      date: "14 Jun 2025",
      price: "$6.990",
      code: "PM",
    },
    {
      type: "Trimestral",
      topic: "Economía",
      title: "Escenarios económicos · Segundo trimestre",
      description:
        "Actividad, inflación y escenarios para la economía chilena.",
      pages: "38 páginas",
      date: "03 Jun 2025",
      price: "$17.990",
      code: "EE",
    },
    {
      type: "Especial",
      topic: "Inversiones",
      title: "Guía de fondos mutuos 2025",
      description:
        "Riesgo, costos y criterios para comparar alternativas de inversión.",
      pages: "31 páginas",
      date: "28 May 2025",
      price: "$9.990",
      code: "FM",
    },
    {
      type: "Mensual",
      topic: "Empresas",
      title: "Claves financieras para empresas",
      description:
        "Indicadores y señales relevantes para la planificación de negocios.",
      pages: "22 páginas",
      date: "15 May 2025",
      price: "$6.990",
      code: "CE",
    },
    {
      type: "Anual",
      topic: "Inversiones",
      title: "Perspectivas de inversión 2025",
      description:
        "Balance, tendencias y posibles escenarios para el nuevo ciclo.",
      pages: "62 páginas",
      date: "10 Ene 2025",
      price: "$49.990",
      code: "PI",
    },
    {
      type: "Especial",
      topic: "Mercados",
      title: "Dólar: variables y escenarios",
      description:
        "Las claves para entender los movimientos del tipo de cambio.",
      pages: "18 páginas",
      date: "22 Abr 2025",
      price: "$8.990",
      code: "US",
    },
  ]
  const filters = ["Todos", "Mercados", "Economía", "Inversiones", "Empresas"]
  const visibleReports =
    reportFilter === "Todos"
      ? reports
      : reports.filter((report) => report.topic === reportFilter)
  return (
    <div
      className={`report-browser ${publicMode ? "public-report-browser" : ""}`}
    >
      <section className="report-browser-hero">
        <div>
          <span className="eyebrow light">Informe destacado</span>
          <h1>
            Panorama de mercados
            <br />
            Junio 2025
          </h1>
          <p>
            Una lectura ejecutiva sobre las variables que están moviendo el
            mercado y los escenarios que vale la pena seguir.
          </p>
          <div className="report-hero-meta">
            <span>
              <Icon name="book" size={14} />
              24 páginas
            </span>
            <span>
              <Icon name="clock" size={14} />
              12 min de lectura
            </span>
            <span>Incluido en Lab+</span>
          </div>
          <div className="browser-actions">
            <button
              className="light-button"
              onClick={() => navigate(publicMode ? "login" : "learning")}
            >
              <Icon name="eye" size={17} />{" "}
              {publicMode ? "Ver informe" : "Leer informe"}
            </button>
            <button
              className="ghost-button"
              disabled={publicMode && cartItems.some((item) => item.title === reports[0].title)}
              onClick={() =>
                publicMode
                  ? addToCart?.({
                      kind: "report",
                      title: reports[0].title,
                      subtitle: `${reports[0].type} · ${reports[0].pages}`,
                      price: reports[0].price,
                      code: reports[0].code,
                    })
                  : navigate("learning")
              }
            >
              <span>+</span>{" "}
              {publicMode && cartItems.some((item) => item.title === reports[0].title)
                ? "En la cesta"
                : publicMode
                  ? "Añadir a la cesta"
                  : "Guardar"}
            </button>
          </div>
        </div>
        <div className="featured-report-cover">
          <span>LABFINANZAS</span>
          <div>
            <small>INFORME MENSUAL</small>
            <strong>
              Panorama
              <br />
              de mercados
            </strong>
            <p>Junio · 2025</p>
          </div>
          <b>PM</b>
        </div>
      </section>
      <div className="report-browser-content">
        <div className="browser-toolbar">
          <div>
            <span className="eyebrow">Biblioteca de análisis</span>
            <h2>Explora todos los informes</h2>
          </div>
          <div className="browser-categories">
            {filters.map((item) => (
              <button
                className={reportFilter === item ? "active" : ""}
                onClick={() => setReportFilter(item)}
                key={item}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="report-periods">
          <div>
            <span>01</span>
            <div>
              <strong>Mensuales</strong>
              <p>Seguimiento de indicadores y movimientos recientes.</p>
            </div>
          </div>
          <div>
            <span>02</span>
            <div>
              <strong>Trimestrales</strong>
              <p>Tendencias y escenarios de mediano plazo.</p>
            </div>
          </div>
          <div>
            <span>03</span>
            <div>
              <strong>Anuales y especiales</strong>
              <p>Visión estratégica y temas en profundidad.</p>
            </div>
          </div>
        </div>
        <div className="report-catalog-grid">
          {visibleReports.map((report, index) => (
            <article key={report.title}>
              <div className={`catalog-report-cover cr${index % 3}`}>
                <span>
                  LAB
                  <br />
                  INFORME
                </span>
                <b>{report.code}</b>
                <small>{report.type.toUpperCase()}</small>
              </div>
              <div className="catalog-report-copy">
                <div>
                  <span>{report.topic}</span>
                  <small>{report.type}</small>
                </div>
                <h3>{report.title}</h3>
                <p>{report.description}</p>
                <div className="catalog-report-meta">
                  <span>{report.date}</span>
                  <span>{report.pages}</span>
                </div>
                {publicMode && (
                  <p className="report-buy-copy">
                    Llévalo contigo y consúltalo cuando lo necesites.
                  </p>
                )}
                <div className="catalog-report-bottom">
                  <strong>{report.price}</strong>
                  <button
                    className={
                      publicMode &&
                      cartItems.some((item) => item.title === report.title)
                        ? "added"
                        : ""
                    }
                    disabled={
                      publicMode &&
                      cartItems.some((item) => item.title === report.title)
                    }
                    onClick={() =>
                      publicMode
                        ? addToCart?.({
                            kind: "report",
                            title: report.title,
                            subtitle: `${report.type} · ${report.pages}`,
                            price: report.price,
                            code: report.code,
                          })
                        : navigate("learning")
                    }
                  >
                    {publicMode
                      ? cartItems.some((item) => item.title === report.title)
                        ? "En la cesta"
                        : "Añadir a la cesta"
                      : index < 2
                        ? "Leer ahora"
                        : "Ver detalle"}{" "}
                    <Icon
                      name={
                        publicMode &&
                        !cartItems.some((item) => item.title === report.title)
                          ? "cart"
                          : "arrow"
                      }
                      size={15}
                    />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <section className="report-subscription-banner">
          <div>
            <span className="eyebrow light">Informes por suscripción</span>
            <h2>Recibe cada nueva edición automáticamente.</h2>
            <p>
              Elige una frecuencia mensual, trimestral o anual. Los informes
              llegan a tu correo y quedan guardados en Mi aprendizaje.
            </p>
          </div>
          <div>
            <span>Desde</span>
            <strong>$6.990</strong>
            <small>/ mes</small>
            <button className="light-button" onClick={() => navigate("plans")}>
              Ver planes de informes <Icon name="arrow" size={17} />
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

function MyLearning() {
  const [content, setContent] = useState<"courses" | "reports">("courses")
  const activeCourses = [
    {
      title: "Ordena hoy tus finanzas",
      category: "Finanzas personales",
      progress: 72,
      lesson: "4 de 5",
      image: images.calculator,
    },
    {
      title: "Tu primera cartera de inversión",
      category: "Inversiones",
      progress: 38,
      lesson: "2 de 6",
      image: images.laptop,
    },
    {
      title: "Finanzas para decisiones de negocio",
      category: "Empresas",
      progress: 15,
      lesson: "1 de 8",
      image: images.desk,
    },
  ]
  const savedReports = [
    {
      title: "Panorama de mercados · Junio 2025",
      type: "Informe mensual",
      status: "Nuevo",
      date: "14 Jun 2025",
      pages: "24 páginas",
    },
    {
      title: "Escenarios económicos · Segundo trimestre",
      type: "Informe trimestral",
      status: "Leído",
      date: "03 Jun 2025",
      pages: "38 páginas",
    },
    {
      title: "Perspectivas de inversión 2025",
      type: "Informe anual",
      status: "Guardado",
      date: "10 Ene 2025",
      pages: "62 páginas",
    },
  ]
  return (
    <>
      <div className="learning-summary">
        <div>
          <span>
            <Icon name="play" size={18} />
          </span>
          <div>
            <strong>3 cursos</strong>
            <small>En progreso</small>
          </div>
        </div>
        <div>
          <span>
            <Icon name="chart" size={18} />
          </span>
          <div>
            <strong>3 informes</strong>
            <small>En tu biblioteca</small>
          </div>
        </div>
        <div className="weekly-goal">
          <div>
            <strong>Meta semanal</strong>
            <small>2 h 40 min de 4 horas</small>
          </div>
          <div className="goal-progress">
            <i />
          </div>
          <b>67%</b>
        </div>
      </div>
      <div className="learning-tabs">
        <button
          className={content === "courses" ? "active" : ""}
          onClick={() => setContent("courses")}
        >
          <Icon name="book" size={17} />
          Mis cursos <span>3</span>
        </button>
        <button
          className={content === "reports" ? "active" : ""}
          onClick={() => setContent("reports")}
        >
          <Icon name="chart" size={17} />
          Mis informes <span>3</span>
        </button>
      </div>
      {content === "courses" ? (
        <div className="my-courses">
          <div className="learning-section-title">
            <div>
              <h2>Continúa aprendiendo</h2>
              <p>Retoma tus cursos desde la última lección.</p>
            </div>
            <button>
              Explorar más cursos <Icon name="arrow" size={16} />
            </button>
          </div>
          <div className="my-course-grid">
            {activeCourses.map((course, index) => (
              <article key={course.title}>
                <div className="my-course-image">
                  <img src={course.image} alt="" />
                  <span>{index === 0 ? "Último visto" : course.category}</span>
                  <button aria-label={`Continuar ${course.title}`}>
                    <Icon name="play" size={17} />
                  </button>
                </div>
                <div className="my-course-copy">
                  <span className="eyebrow small">{course.category}</span>
                  <h3>{course.title}</h3>
                  <div className="course-progress-copy">
                    <span>Lección {course.lesson}</span>
                    <strong>{course.progress}%</strong>
                  </div>
                  <div className="wide-progress">
                    <i style={{ width: `${course.progress}%` }} />
                  </div>
                  <button>
                    Continuar curso <Icon name="arrow" size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : (
        <div className="my-reports account-card">
          <div className="learning-section-title">
            <div>
              <h2>Biblioteca de informes</h2>
              <p>Tus análisis contratados y ediciones guardadas.</p>
            </div>
            <button>
              Explorar informes <Icon name="arrow" size={16} />
            </button>
          </div>
          <div className="reports-library">
            {savedReports.map((report, index) => (
              <article key={report.title}>
                <div className={`report-cover c${index}`}>
                  <Icon name="chart" size={22} />
                  <span>
                    LAB
                    <br />
                    INFORME
                  </span>
                </div>
                <div className="report-library-copy">
                  <span className="eyebrow small">{report.type}</span>
                  <h3>{report.title}</h3>
                  <p>
                    {report.date} · {report.pages}
                  </p>
                </div>
                <span className={`report-status s${index}`}>
                  {report.status}
                </span>
                <div className="report-actions">
                  <button>
                    <Icon name="eye" size={16} /> Leer
                  </button>
                  <button aria-label="Más opciones">•••</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

function History() {
  return (
    <>
      <div className="stats-row">
        <div>
          <span>
            <Icon name="book" />
          </span>
          <div>
            <strong>3</strong>
            <small>Cursos en progreso</small>
          </div>
        </div>
        <div>
          <span>
            <Icon name="clock" />
          </span>
          <div>
            <strong>8,5 h</strong>
            <small>Tiempo de aprendizaje</small>
          </div>
        </div>
        <div>
          <span>
            <Icon name="check" />
          </span>
          <div>
            <strong>12</strong>
            <small>Contenidos completados</small>
          </div>
        </div>
      </div>
      <div className="account-card">
        <div className="card-title">
          <h2>Continúa aprendiendo</h2>
          <button>Ver todo</button>
        </div>
        <div className="continue-item">
          <img src={images.calculator} alt="" />
          <div>
            <span className="eyebrow small">Finanzas personales</span>
            <h3>Ordena hoy tus finanzas</h3>
            <p>Lección 4 de 5 · Presupuesto con propósito</p>
            <div className="wide-progress">
              <i />
            </div>
          </div>
          <button className="round-action">
            <Icon name="play" size={17} />
          </button>
        </div>
      </div>
      <div className="account-card">
        <div className="card-title">
          <h2>Actividad reciente</h2>
          <button>Filtrar</button>
        </div>
        <div className="activity-list">
          {[
            [
              "check",
              "Completaste una lección",
              "Tu mapa financiero personal",
              "Hoy, 10:32",
            ],
            [
              "eye",
              "Leíste un informe",
              "Panorama de mercados · Junio",
              "Ayer, 18:14",
            ],
            [
              "book",
              "Comenzaste un curso",
              "Tu primera cartera de inversión",
              "10 Jun, 09:45",
            ],
          ].map((a, i) => (
            <div key={a[2]}>
              <span className={`activity-icon a${i}`}>
                <Icon name={a[0] as IconName} size={18} />
              </span>
              <div>
                <strong>{a[1]}</strong>
                <p>{a[2]}</p>
              </div>
              <small>{a[3]}</small>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

function Notifications() {
  return (
    <div className="account-card notifications-card">
      <div className="card-title">
        <h2>Recientes</h2>
        <button>Marcar todo como leído</button>
      </div>
      {[
        [
          "Nuevo informe disponible",
          "Ya puedes leer el Panorama de Mercados de esta semana.",
          "Hace 20 min",
        ],
        [
          "Sigue avanzando",
          "Te queda una lección para completar “Ordena hoy tus finanzas”.",
          "Ayer",
        ],
        [
          "Contenido recomendado para ti",
          "Seleccionamos una guía sobre fondos mutuos según tus intereses.",
          "10 Jun",
        ],
      ].map((n, i) => (
        <div className={`notification ${i < 2 ? "unread" : ""}`} key={n[0]}>
          <span>
            <Icon
              name={i === 0 ? "chart" : i === 1 ? "play" : "book"}
              size={19}
            />
          </span>
          <div>
            <strong>{n[0]}</strong>
            <p>{n[1]}</p>
            <small>{n[2]}</small>
          </div>
          {i < 2 && <i />}
        </div>
      ))}
    </div>
  )
}

function Settings() {
  const [avatar, setAvatar] = useState("CS")
  const [avatarPhoto, setAvatarPhoto] = useState<string | null>(null)
  const [preferences, setPreferences] = useState({
    weekly: true,
    progress: true,
    reports: true,
    product: false,
  })
  const [topics, setTopics] = useState(["Inversiones", "Finanzas personales"])
  const togglePreference = (key: keyof typeof preferences) =>
    setPreferences({ ...preferences, [key]: !preferences[key] })
  const toggleTopic = (topic: string) =>
    setTopics(
      topics.includes(topic)
        ? topics.filter((item) => item !== topic)
        : [...topics, topic],
    )
  return (
    <div className="settings-grid">
      <div className="account-card profile-settings">
        <div className="card-title">
          <div>
            <h2>Información personal</h2>
            <p>Tu identidad visible dentro de LabFinanzas.</p>
          </div>
        </div>
        <div className="avatar-editor">
          <div className="current-avatar">
            {avatarPhoto ? (
              <img src={avatarPhoto} alt="Avatar seleccionado" />
            ) : (
              <span className={`avatar-style ${avatar.toLowerCase()}`}>
                {avatar}
              </span>
            )}
          </div>
          <div className="avatar-options">
            <strong>Elige un avatar</strong>
            <div>
              {["CS", "C1", "C2", "C3"].map((option, i) => (
                <button
                  aria-label={`Avatar ${i + 1}`}
                  className={`${
                    avatar === option && !avatarPhoto ? "selected " : ""
                  }avatar-style ${option.toLowerCase()}`}
                  onClick={() => {
                    setAvatar(option)
                    setAvatarPhoto(null)
                  }}
                  key={option}
                >
                  {option === "CS" ? (
                    "CS"
                  ) : (
                    <Icon
                      name={i === 1 ? "spark" : i === 2 ? "chart" : "book"}
                      size={17}
                    />
                  )}
                </button>
              ))}
            </div>
            <label className="upload-avatar">
              <Icon name="arrow" size={14} /> Subir una foto
              <input
                type="file"
                accept="image/png,image/jpeg"
                onChange={(event) => {
                  const file = event.target.files?.[0]
                  if (file) setAvatarPhoto(URL.createObjectURL(file))
                }}
              />
            </label>
            <small>JPG o PNG · Máximo recomendado 2 MB</small>
          </div>
        </div>
        <div className="form-grid">
          <label>
            Nombre
            <input defaultValue="Camila" />
          </label>
          <label>
            Apellido
            <input defaultValue="Soto" />
          </label>
          <label className="wide">
            Correo electrónico
            <input defaultValue="camila@correo.com" />
          </label>
        </div>
        <button className="primary small">Guardar cambios</button>
      </div>
      <div className="account-card subscription-settings">
        <div className="card-title">
          <div>
            <h2>Mi suscripción</h2>
            <p>Estado y uso del plan contratado.</p>
          </div>
          <span className="plan-active">
            <i /> Activa
          </span>
        </div>
        <div className="current-plan">
          <span className="plan-monogram">L+</span>
          <div>
            <small>PLAN ACTUAL</small>
            <strong>Lab+ Anual</strong>
            <p>Acceso completo hasta el 14 Jun 2026</p>
          </div>
        </div>
        <div className="plan-usage">
          <div>
            <span>Próximo cobro</span>
            <strong>$79.990</strong>
            <small>14 Jun 2026</small>
          </div>
          <div>
            <span>Contenido incluido</span>
            <strong>Ilimitado</strong>
            <small>Cursos e informes</small>
          </div>
        </div>
        <button className="outline-action">
          Administrar suscripción <Icon name="arrow" size={16} />
        </button>
        <button className="cancel-plan">Cancelar renovación automática</button>
      </div>
      <div className="account-card preferences-settings">
        <div className="card-title">
          <div>
            <h2>Preferencias de contenido</h2>
            <p>Personaliza las recomendaciones y comunicaciones que recibes.</p>
          </div>
          <span className="saved-label">
            <Icon name="check" size={12} /> Se guardan automáticamente
          </span>
        </div>
        <div className="preference-layout">
          <div className="topic-preferences">
            <strong>¿Qué temas te interesan?</strong>
            <p>
              Usaremos esta selección para ordenar cursos, artículos e informes.
            </p>
            <div>
              {[
                "Inversiones",
                "Finanzas personales",
                "Empresas",
                "Mercados",
                "Economía",
              ].map((topic) => (
                <button
                  className={topics.includes(topic) ? "selected" : ""}
                  onClick={() => toggleTopic(topic)}
                  key={topic}
                >
                  {topics.includes(topic) && <Icon name="check" size={12} />}
                  {topic}
                </button>
              ))}
            </div>
          </div>
          <div className="notification-preferences">
            <strong>Comunicaciones</strong>
            <div className="toggle-row">
              <div>
                <strong>Resumen semanal</strong>
                <p>Una selección de novedades y contenidos destacados.</p>
              </div>
              <button
                aria-label="Activar resumen semanal"
                className={`toggle ${preferences.weekly ? "on" : ""}`}
                onClick={() => togglePreference("weekly")}
              >
                <i />
              </button>
            </div>
            <div className="toggle-row">
              <div>
                <strong>Progreso de cursos</strong>
                <p>Recordatorios para retomar tu aprendizaje.</p>
              </div>
              <button
                aria-label="Activar progreso de cursos"
                className={`toggle ${preferences.progress ? "on" : ""}`}
                onClick={() => togglePreference("progress")}
              >
                <i />
              </button>
            </div>
            <div className="toggle-row">
              <div>
                <strong>Nuevos informes</strong>
                <p>Aviso cuando esté disponible una nueva edición.</p>
              </div>
              <button
                aria-label="Activar nuevos informes"
                className={`toggle ${preferences.reports ? "on" : ""}`}
                onClick={() => togglePreference("reports")}
              >
                <i />
              </button>
            </div>
            <div className="toggle-row">
              <div>
                <strong>Novedades de producto</strong>
                <p>Nuevas herramientas y funcionalidades.</p>
              </div>
              <button
                aria-label="Activar novedades de producto"
                className={`toggle ${preferences.product ? "on" : ""}`}
                onClick={() => togglePreference("product")}
              >
                <i />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="account-card payment-settings">
        <div className="card-title">
          <div>
            <h2>Métodos de pago</h2>
            <p>
              Administra las tarjetas asociadas a tus compras y suscripciones.
            </p>
          </div>
          <span className="secure-label">
            <Icon name="lock" size={13} /> Datos protegidos
          </span>
        </div>
        <div className="saved-payment">
          <span className="payment-brand">VISA</span>
          <div className="payment-identity">
            <strong>Visa terminada en 4242</strong>
            <small>Crédito · Vence 08/28</small>
          </div>
          <span className="default-payment">
            <Icon name="check" size={12} /> Predeterminada
          </span>
          <div className="payment-actions">
            <button>Editar</button>
            <button className="remove-payment">Eliminar</button>
          </div>
        </div>
        <div className="billing-use">
          <Icon name="settings" size={17} />
          <div>
            <strong>Uso de este método</strong>
            <p>
              Se utilizará para renovar tu Plan Premium anual el 14 de junio de
              2026.
            </p>
          </div>
        </div>
        <button className="add-payment">
          <span>+</span> Agregar otro método de pago
        </button>
        <p className="payment-disclaimer">
          <Icon name="lock" size={12} /> LabFinanzas no almacena los datos
          completos de tu tarjeta.
        </p>
      </div>
      <div className="account-card security-settings">
        <div>
          <span className="security-icon">
            <Icon name="lock" size={18} />
          </span>
          <div>
            <h2>Seguridad y acceso</h2>
            <p>Último acceso: hoy a las 10:32 desde Santiago, Chile.</p>
          </div>
        </div>
        <div>
          <button>Cambiar contraseña</button>
          <button>Ver sesiones activas</button>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [page, setPage] = useState<Page>("home")
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(
    null,
  )
  const [cartItems, setCartItems] = useState<PurchaseItem[]>([])
  const [addedModalItem, setAddedModalItem] = useState<PurchaseItem | null>(
    null,
  )
  const [checkoutItems, setCheckoutItems] = useState<PurchaseItem[]>([
    {
      kind: "plan",
      title: "Membresía Lab+ Anual",
      subtitle: "Renovación anual automática",
      price: "$79.990",
    },
  ])
  const navigate = (next: Page) => {
    if (next === "blog") {
      setSelectedArticleId(null)
    }
    setPage(next)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  const openArticle = (articleId: string | null) => {
    setSelectedArticleId(articleId)
    setPage("blog")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  const startCheckout = (item: PurchaseItem) => {
    setCheckoutItems([item])
    navigate("checkout")
  }
  const addToCart = (item: PurchaseItem) => {
    setCartItems((current) =>
      current.some((cartItem) => cartItem.title === item.title)
        ? current
        : [...current, item],
    )
    setAddedModalItem(item)
  }
  const removeFromCart = (title: string) => {
    setCartItems((current) => current.filter((item) => item.title !== title))
  }
  const goToCartCheckout = () => {
    if (cartItems.length === 0) return
    setAddedModalItem(null)
    setCheckoutItems(cartItems)
    navigate("checkout")
  }
  useEffect(() => {
    document.title = "LabFinanzas — Decide con confianza"
  }, [])
  const accountPage =
    page === "discover" ||
    page === "discoverReports" ||
    page === "learning" ||
    page === "history" ||
    page === "notifications" ||
    page === "settings"
  if (page === "login") return <Login navigate={navigate} />
  if (page === "checkout")
    return (
      <Checkout
        items={checkoutItems}
        navigate={navigate}
        onComplete={() => {
          if (!checkoutItems.some((item) => item.kind === "plan")) {
            setCartItems([])
          }
        }}
      />
    )
  if (accountPage) return <Dashboard page={page} navigate={navigate} />
  return (
    <div className="app">
      <Header
        page={page}
        navigate={navigate}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        goToCheckout={goToCartCheckout}
      />
      {page === "home" && (
        <Home
          navigate={navigate}
          startCheckout={startCheckout}
          openArticle={openArticle}
        />
      )}
      {page === "about" && <About navigate={navigate} />}
      {page === "business" && (
        <LearningPage kind="business" navigate={navigate} />
      )}
      {page === "personal" && (
        <LearningPage kind="personal" navigate={navigate} />
      )}
      {page === "catalog" && (
        <PublicCatalog
          navigate={navigate}
          addToCart={addToCart}
          cartItems={cartItems}
        />
      )}
      {page === "blog" && (
        <Blog
          navigate={navigate}
          selectedArticleId={selectedArticleId}
          onSelectArticle={openArticle}
        />
      )}
      {page === "plans" && (
        <Plans navigate={navigate} startCheckout={startCheckout} />
      )}
      {page === "kit" && <UiKit navigate={navigate} />}
      {addedModalItem && (
        <div
          className="cart-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-modal-title"
          onClick={() => setAddedModalItem(null)}
        >
          <div
            className="cart-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cart-modal-head">
              <div>
                <span className="cart-modal-check">
                  <Icon name="check" size={16} />
                </span>
                <strong id="cart-modal-title">Añadido a la cesta</strong>
              </div>
              <button
                aria-label="Cerrar ventana"
                onClick={() => setAddedModalItem(null)}
              >
                <Icon name="x" size={18} />
              </button>
            </div>
            <div className="cart-modal-item">
              {addedModalItem.image ? (
                <img src={addedModalItem.image} alt="" />
              ) : (
                <span className="cart-modal-symbol">
                  {addedModalItem.code ?? "IF"}
                </span>
              )}
              <div>
                <small>
                  {addedModalItem.kind === "report"
                    ? "INFORME DIGITAL"
                    : "CURSO ONLINE"}
                </small>
                <h3>{addedModalItem.title}</h3>
                <p>{addedModalItem.subtitle}</p>
                <strong>{addedModalItem.price}</strong>
              </div>
            </div>
            <div className="cart-modal-summary">
              <span>
                {cartItems.length}{" "}
                {cartItems.length === 1
                  ? "producto en la cesta"
                  : "productos en la cesta"}
              </span>
              <strong>Total: {purchaseTotal(cartItems)}</strong>
            </div>
            <div className="cart-modal-actions">
              <button
                className="cart-modal-secondary"
                onClick={() => setAddedModalItem(null)}
              >
                Seguir buscando
              </button>
              <button className="cart-modal-primary" onClick={goToCartCheckout}>
                Ir a pagar <Icon name="arrow" size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
