export type ArticleSection = { heading: string; paragraphs: string[] };
export type Article = { lead: string; sections: ArticleSection[] };

// Originale norske artikler, skrevet av Agentverden på grunnlag av offentlig
// tilgjengelig informasjon fra kildene oppgitt i useCases.ts. Artiklene skal
// ikke inneholde opplysninger som ikke står i kildene.
// Nøkkelen er id-en til use caset i useCases.ts.
export const articles: Record<string, Article> = {
  "cowork-hva-folk-bruker": {
    lead: "Anthropic har gått gjennom 1,2 millioner økter i Claude Cowork fra mai 2026. Bildet er tydelig: de fleste bruker verktøyet til rutinearbeid som omgir den egentlige jobben, ikke til selve fagarbeidet.",
    sections: [
      {
        heading: "Hva er Claude Cowork?",
        paragraphs: [
          "Claude Cowork er en versjon av Claude som kan jobbe med filer og flere steg på en gang, i stedet for å bare svare på enkeltspørsmål. Anthropic publiserte i juli 2026 en gjennomgang av hvordan folk faktisk bruker det.",
        ],
      },
      {
        heading: "Hva folk bruker det til",
        paragraphs: [
          "Den største kategorien er forretningsprosesser og drift, med 33,4 prosent av øktene i utvalget. Eksempler er å samle spredte oppdateringer i én rapport, lage sjekklister for nyansatte og avstemme regneark. Dette er oppgaver som går igjen i mange yrker, ikke minst innen økonomi, personal og administrasjon.",
          "Nummer to er innholdsproduksjon med 16,4 prosent: utkast til presentasjoner, innlegg, tilbud og forretningskorrespondanse. Anthropic beskriver det som en hjelp til å komme forbi det blanke arket, ved å gjøre tanker og informasjon om til et første utkast.",
          "Research kommer på 6,4 prosent. Der brukes verktøyet til å koke ned store mengder materiale til én rapport. Dataanalyse (5,8 prosent), dokumentbehandling (4,1 prosent) og salg (4 prosent) er mindre kategorier. Programvareutvikling og drift utgjør til sammen rundt 16 prosent, men Anthropic skriver at mye av det er kommunikasjonsarbeid, mens selve kodingen oftere skjer i Claude Code.",
        ],
      },
      {
        heading: "Eksemplene fra Anthropic",
        paragraphs: [
          "En jurist bruker Cowork til å formatere og levere dokumenter, slik at det blir mer tid til faglige vurderinger. En ansettelsesansvarlig bruker det til å sette opp møter og sammenfatte tilbakemeldinger fra intervjuer. En teamleder lot det lage en presentasjon som forklarte en vanskelig beslutning, så hen kunne bruke tiden på selve beslutningen.",
          "Felles for eksemplene er at verktøyet tar den «koblende» jobben, mens personen beholder kjernearbeidet.",
        ],
      },
      {
        heading: "Verdt å vite",
        paragraphs: [
          "Tallene gjelder andeler av et utvalg økter, ikke absolutte volum, og Anthropic understreker det selv. De sier altså noe om hva folk bruker verktøyet til, ikke hvor mye det brukes. Som alltid med KI-utkast: les gjennom resultatet før du sender det videre.",
        ],
      },
    ],
  },

  "claude-code-visualisering": {
    lead: "Hos Anthropic bygde dataforskere interaktive grafer av resultater fra en KI-modell, uten å kunne programmeringsspråket verktøyet skrev koden i. De beskrev bare hva de ville ha.",
    sections: [
      {
        heading: "Hva skjedde?",
        paragraphs: [
          "Anthropic har skrevet om hvordan ulike team internt bruker Claude Code, selskapets verktøy for programmering med KI. Et av eksemplene gjelder dataforskere som ville visualisere ytelsen til en KI-modell.",
          "I stedet for å lære seg React og TypeScript beskrev de ønsket i en enkelt instruks, og lot verktøyet bygge visualiseringene i et avgrenset testmiljø. Ifølge Anthropic hadde de ikke selv kunnskap om TypeScript.",
        ],
      },
      {
        heading: "Hvorfor er det interessant?",
        paragraphs: [
          "Eksemplet viser at KI-verktøy for kode kan brukes av folk som ikke er programmerere, så lenge de vet hva de vil ha ut. Barrieren er ikke lenger å kunne språket grafene skrives i, men å vite hva du vil ha ut.",
        ],
      },
      {
        heading: "Dette bør du tenke på",
        paragraphs: [
          "Eksemplet er fra Anthropics eget team. Resultatet av en enkelt instruks må uansett kontrolleres: stemmer tallene i grafen med dataene du startet med? Bruk gjerne et avgrenset miljø, slik teamet gjorde, så ikke noe annet på maskinen din blir berørt.",
        ],
      },
    ],
  },

  "claude-code-annonsevarianter": {
    lead: "Markedsteamet hos Anthropic bygde en arbeidsflyt der to hjelpeagenter går gjennom hundrevis av annonser, finner de svakeste og skriver nye varianter som holder seg innenfor tegngrensene.",
    sections: [
      {
        heading: "Slik fungerte det",
        paragraphs: [
          "Teamet for vekst og markedsføring hos Anthropic hadde mange annonser å holde styr på. De satte opp en arbeidsflyt med to spesialiserte hjelpeagenter i Claude Code. Den første leser en fil med hundrevis av annonser og flagger de som presterer dårlig. Den andre skriver nye varianter, som holder seg innenfor tegngrensene.",
          "Eksempelet kommer fra Anthropics egen beskrivelse av hvordan teamet jobber.",
        ],
      },
      {
        heading: "Et tillegg i Figma",
        paragraphs: [
          "Samme team bygde også et tillegg til designverktøyet Figma som lager opptil 100 annonsevarianter ved å bytte ut overskrifter og beskrivelser. Ifølge Anthropic tar hver runde et halvt sekund.",
        ],
      },
      {
        heading: "Hva kan en privatperson ta med seg?",
        paragraphs: [
          "Tenk deg alt som består av mange nesten like tekster: annonser for en liten nettbutikk, innlegg for en forening, eller finn.no-annonser for ting du vil selge. Prinsippet er det samme. La én del finne ut hva som ikke fungerer, og la en annen skrive alternativer innenfor reglene til plattformen.",
          "Les alltid gjennom tekstene før de publiseres. KI-forslag kan inneholde påstander du ikke kan stå inne for.",
        ],
      },
    ],
  },

  "chatgpt-restaurantbord": {
    lead: "ChatGPT kan søke etter restauranter og vise ledige tider. Men det kan ikke endre eller avbestille bordet du allerede har, og funksjonen finnes ikke på alle abonnementstyper.",
    sections: [
      {
        heading: "Hva det gjør",
        paragraphs: [
          "Du kan be ChatGPT finne restauranter og tilgjengelige tider ut fra sted, dato, klokkeslett, antall gjester og hva du ønsker deg. Ledigheten kan komme fra bestillingstjenester som OpenTable, Resy og Yelp, ifølge OpenAIs hjelpesenter.",
        ],
      },
      {
        heading: "Hva det ikke gjør",
        paragraphs: [
          "ChatGPT lagrer, endrer eller avbestiller ikke eksisterende bestillinger, og viser dem heller ikke. Tjenesten er dessuten ikke tilgjengelig på alle abonnementstyper. Sjekk selv om bestillingstjenestene som nevnes dekker området ditt.",
        ],
      },
      {
        heading: "Tips",
        paragraphs: [
          "Vær konkret når du spør: «Bord til fire lørdag kl. 19, vegetarmat, i nærheten av sentrum.» Sjekk alltid at tiden stemmer hos restauranten før du setter av kvelden.",
        ],
      },
    ],
  },

  "chatgpt-hverdagsbruk": {
    lead: "OpenAI har analysert 1,5 millioner samtaler med ChatGPT. Konklusjonen er at folk stort sett bruker det til hverdagslige ting: praktiske råd, å finne informasjon og å skrive.",
    sections: [
      {
        heading: "Hva studien fant",
        paragraphs: [
          "Omtrent tre av fire samtaler handler om praktisk veiledning, informasjonssøk eller skriving. Skriving er den vanligste oppgaven i jobbsammenheng. OpenAI deler meldingene i to typer: om lag halvparten er spørsmål der folk ber om råd eller informasjon, og rundt 40 prosent er oppgaver der ChatGPT skal gjøre noe, som å skrive en tekst, lage en plan eller programmere.",
        ],
      },
      {
        heading: "Hva betyr det?",
        paragraphs: [
          "For de fleste er KI-chatboten ikke et eksotisk verktøy, men en slags allmenn hjelper for ting som alle trenger: å forstå noe, formulere noe eller komme i gang med noe. Det kan være en nyttig påminnelse hvis du lurer på om du «bruker det riktig». Det vanligste bruket er enkelt.",
        ],
      },
      {
        heading: "Verdt å vite",
        paragraphs: [
          "Tallene kommer fra OpenAI selv, som har analysert sin egen tjeneste. Studien sier derfor ingenting om hvordan norske brukere bruker verktøyet, eller om svarene var gode.",
        ],
      },
    ],
  },

  "chatgpt-agent-reise": {
    lead: "Da OpenAI lanserte ChatGPT agent, viste de at den kan planlegge og booke reiser og middagsselskap. Innlegget er i dag merket som utdatert, så sjekk hva som gjelder nå.",
    sections: [
      {
        heading: "Hva agenten kan",
        paragraphs: [
          "ChatGPT agent er laget for å gjøre flere steg på egen hånd. Den åpner nettsider, filtrerer resultater, kjører kode og kan levere ferdige filer som presentasjoner og regneark. Når den trenger innlogging, ber den deg logge inn på en sikker måte.",
          "OpenAIs eksempler fra lanseringen inkluderte å planlegge og booke reiser, og å planlegge og booke middagsselskap.",
        ],
      },
      {
        heading: "Hva er annerledes enn en vanlig chat?",
        paragraphs: [
          "I en vanlig chat får du et svar du selv må handle på. En agent forsøker å gjennomføre selve oppgaven, for eksempel å lete etter fly og hoteller og sette sammen et forslag. Du må likevel følge med, godkjenne og rette opp.",
        ],
      },
      {
        heading: "Dette bør du tenke på",
        paragraphs: [
          "Funksjonene og navnene er endret siden lanseringen, og tilgangen avhenger av abonnementet ditt. Bestill aldri noe du ikke har sjekket selv: pris, reisedatoer og avbestillingsvilkår må du lese selv før du bekrefter.",
        ],
      },
    ],
  },

  "codex-nettleserspill": {
    lead: "OpenAI viser at Codex kan gjøre en kort spillidé om til et fungerende nettleserspill, og teste det i en ekte nettleser underveis.",
    sections: [
      {
        heading: "Hva er Codex?",
        paragraphs: [
          "Codex er OpenAIs kodeagent. Den er laget for programmerere, men dokumentasjonen viser også eksempler som ligger litt utenfor vanlig programvareutvikling. Spill i nettleseren er ett av dem.",
        ],
      },
      {
        heading: "Slik går det til",
        paragraphs: [
          "Du starter med en kort beskrivelse av spillet du vil ha, et såkalt spillkonsept. Codex gjør det om til en plan, bygger spillet som en nettside og tester det i en ekte nettleser. Når spillet testes i en ekte nettleser, kan agenten se hvordan det faktisk oppfører seg.",
        ],
      },
      {
        heading: "Hva er realistisk?",
        paragraphs: [
          "Et enkelt nettleserspill for moro skyld kan være et fornuftig første prosjekt. Forvent ikke et ferdig kommersielt spill, men et utgangspunkt du kan justere stegvis ved å beskrive hva du vil endre.",
        ],
      },
    ],
  },

  "gemini-husarbeid": {
    lead: "Google har samlet fire tips for hvordan Gemini kan hjelpe med hverdagslige gjøremål hjemme: meny fra kjøleskapet, feilsøking fra bilder, kvitteringer og sammenligning av større kjøp.",
    sections: [
      {
        heading: "1. Ukemeny fra det du har",
        paragraphs: [
          "Fortell Gemini hva du har i kjøleskapet, og be om forslag til middager og en ukemeny.",
        ],
      },
      {
        heading: "2. Feilsøking fra bilder",
        paragraphs: [
          "Hvis noe hjemme har gått i stykker, kan du sende et bilde og beskrive problemet. Gemini kan foreslå hva som kan være feil og hva du kan prøve selv. For alt som gjelder strøm, gass eller bærende konstruksjoner bør du likevel bruke en fagperson.",
        ],
      },
      {
        heading: "3. Kvitteringer",
        paragraphs: [
          "Du kan laste opp bilder av månedens kvitteringer og be Gemini hente ut opplysningene, slik at du slipper å skrive dem inn selv. Det er nyttig om du fører regnskap for husholdningen eller for en liten virksomhet.",
        ],
      },
      {
        heading: "4. Sammenlign større kjøp",
        paragraphs: [
          "Skal du for eksempel kjøpe vaskemaskin eller sofa, kan Gemini hjelpe deg å sammenligne alternativene.",
        ],
      },
      {
        heading: "Verdt å vite",
        paragraphs: [
          "Kontroller alltid tallene når Gemini leser kvitteringer, og sjekk priser og egenskaper på produktene selv. Del ikke mer personlig informasjon enn nødvendig.",
        ],
      },
    ],
  },

  "gemini-agent-hverdag": {
    lead: "Gemini Agent og Gemini Spark kan ta seg av flere steg på egen hånd: sortere e-post, sende en morgenoppsummering og reservere restaurantbord. Alt som sender, kjøper eller sender inn krever at du bekrefter.",
    sections: [
      {
        heading: "Hva er forskjellen på Agent og Spark?",
        paragraphs: [
          "Ifølge Googles hjelpesider er Gemini Agent en funksjon for oppgaver med flere steg. Gemini Spark beskrives som en personlig agent som kan jobbe i bakgrunnen og håndtere oppgaver som gjentar seg, for eksempel en daglig nyhetsoppdatering eller et varsel hvis flyet ditt er forsinket.",
        ],
      },
      {
        heading: "Eksempler Google nevner",
        paragraphs: [
          "Sortere e-post i kategorier og skrive utkast til svar. Sende en oppsummering av dagen som ligger foran deg. Reservere restaurantbord og booke overnatting. Overvåke priser på fly og hoteller og varsle når de faller innenfor budsjettet ditt.",
          "På Android finnes dessuten en betafunksjon som styrer enkelte apper for deg, for eksempel for å bestille skyss, mat eller billetter.",
        ],
      },
      {
        heading: "Du må godkjenne",
        paragraphs: [
          "Google skriver at Gemini ber om bekreftelse før sensitive handlinger: å sende meldinger, endre data, kjøpe noe eller sende inn skjemaer. Noen ganger må du selv ta over i nettleseren.",
        ],
      },
      {
        heading: "Begrensninger",
        paragraphs: [
          "Spark krever abonnement og er for brukere over 18 år. Tilgangen varierer med land og enhet. Google advarer også om at automatiseringen i apper kan gjøre feil, som å bestille feil antall eller melde en oppgave som ferdig når den ikke er det. Sjekk derfor alltid resultatet.",
        ],
      },
    ],
  },

  "manus-japan-reise": {
    lead: "Manus viser selv et eksempel der agenten lager både en personlig reiseplan og en skreddersydd reisehåndbok for en tur til Japan.",
    sections: [
      {
        heading: "Hva er Manus?",
        paragraphs: [
          "Manus er en KI-agent som tar imot en oppgave og jobber seg gjennom den på egen hånd, i stedet for å bare svare i en chat. På sin egen nettside viser de flere eksempler. Ett av dem gjelder reiseplanlegging.",
        ],
      },
      {
        heading: "Eksempelet",
        paragraphs: [
          "Agenten samler informasjon om reisemålet og setter det sammen til en personlig reiseplan. I tillegg lager den en egen reisehåndbok som er tilpasset turen. Eksempelturen går til Japan.",
        ],
      },
      {
        heading: "Slik kan du bruke ideen",
        paragraphs: [
          "Du kan gjøre noe liknende med de fleste KI-tjenester: beskriv hvem som reiser, hvor lenge, hva dere liker og hva dere har å rutte med, og be om et konkret dagsprogram. En «håndbok» kan inneholde praktisk informasjon du vil ha samlet på ett sted.",
          "Sjekk åpningstider, priser og transport selv. KI-generert reiseinformasjon kan være utdatert eller feil.",
        ],
      },
    ],
  },

  "manus-cv-nettside": {
    lead: "En bruker lot Manus gjøre CV-en om til en responsiv, personlig nettside. Eksempelet er delt av brukere på Manus sin egen nettside.",
    sections: [
      {
        heading: "Hva skjedde?",
        paragraphs: [
          "Manus har et utvalg eksempler som brukere har valgt å dele. Ett av dem er en person som lot agenten ta utgangspunkt i en eksisterende CV og lage en personlig nettside av den. Siden er responsiv, det vil si at den tilpasser seg både mobil og stor skjerm.",
        ],
      },
      {
        heading: "Hvorfor kan det være nyttig?",
        paragraphs: [
          "En personlig nettside gjør det lettere for arbeidsgivere eller oppdragsgivere å finne deg. Fordelen med denne tilnærmingen er at innholdet allerede finnes i CV-en, så du slipper å formulere alt på nytt.",
        ],
      },
      {
        heading: "Dette bør du tenke på",
        paragraphs: [
          "En CV inneholder personopplysninger som telefonnummer og adresse. Tenk gjennom hva du vil ha offentlig tilgjengelig før du publiserer noe. Les også gjennom alt innholdet, slik at ingenting er endret eller diktet opp underveis.",
        ],
      },
    ],
  },

  "meta-ai-dagsbrief": {
    lead: "Med Muse Spark 1.1 kan Meta AI gjøre mer enn å svare: den kan legge planer, koble seg til e-post og kalender, lage presentasjoner og ta seg av oppgaver for deg.",
    sections: [
      {
        heading: "Hva er nytt?",
        paragraphs: [
          "Meta skriver at Meta AI med modellen Muse Spark 1.1 går fra å være en chatbot til å utføre oppgaver. Den kan koble seg til e-post- og kalenderapper, lage presentasjoner og planlegge. En daglig oppsummering er et av eksemplene Meta nevner.",
        ],
      },
      {
        heading: "En daglig oppsummering",
        paragraphs: [
          "Tanken er enkel: i stedet for å åpne både e-post og kalender hver morgen, får du en samlet oversikt over hva som venter. Slike oppsummeringer kan spare litt tid hver dag.",
        ],
      },
      {
        heading: "Verdt å vite",
        paragraphs: [
          "Funksjonene er presentert av Meta selv, og tilgjengeligheten kan variere med land og versjon. Å koble en assistent til e-posten og kalenderen din betyr at den får innsyn i personlig informasjon. Les vilkårene og vurder hva du er komfortabel med.",
        ],
      },
    ],
  },

  "grok-bot-booking": {
    lead: "xAI beskriver Grok Bot som løsningen når en oppgave har flere steg, som å bestille kaffe eller booke middag. Enklere koblinger tar seg av småting som å sjekke kalenderen.",
    sections: [
      {
        heading: "Hva er Grok Bot?",
        paragraphs: [
          "Grok Bot er xAIs agent for oppgaver som består av flere steg. Omtalen kommer i lanseringen av Grok Voice 3.0, som xAI presenterte 14. oktober 2026.",
        ],
      },
      {
        heading: "To nivåer",
        paragraphs: [
          "xAI skiller mellom to typer hjelp. For enkle ting, som å sjekke en avtale i kalenderen, brukes enkle koblinger. For større oppgaver, som å bestille en kaffe eller booke et bord til middag, brukes Grok Bot.",
          "Eksemplet i innlegget gjelder Tesla-førere.",
        ],
      },
      {
        heading: "Verdt å vite",
        paragraphs: [
          "Dette er xAIs egen beskrivelse. Hva som faktisk er tilgjengelig for norske brukere og biler, må du sjekke selv. Bestillinger bør du kontrollere i etterkant: stemte tidspunkt, sted og pris?",
        ],
      },
    ],
  },

  "n8n-epost-godkjenning": {
    lead: "En fellesskapsmal for n8n lar KI skrive utkast til e-postsvar, men sender ingenting før du har godkjent det på Telegram.",
    sections: [
      {
        heading: "Hva er n8n?",
        paragraphs: [
          "n8n er et verktøy for å koble sammen tjenester og lage automatiske arbeidsflyter. Brukere deler ferdige maler som andre kan bruke som utgangspunkt. Denne malen kombinerer Gmail, KI og Telegram.",
        ],
      },
      {
        heading: "Slik fungerer malen",
        paragraphs: [
          "Malen går gjennom innboksen og avgjør hvilke e-poster som trenger svar. For hver av dem skriver KI et utkast. Du får en forhåndsvisning på Telegram. Først når du godkjenner, sendes svaret fra Gmail.",
          "Godkjenningene har en tidsfrist: hvis du ikke svarer innen fem minutter, utløper forespørselen automatisk.",
        ],
      },
      {
        heading: "Hvorfor godkjenningssteget er smart",
        paragraphs: [
          "Det største problemet med automatiske svar er at KI kan misforstå eller si noe du ikke mener. Ved å legge et menneske i løkken beholder du kontrollen, men slipper selve skrivearbeidet.",
        ],
      },
      {
        heading: "Dette bør du tenke på",
        paragraphs: [
          "Malen er laget av en bruker, ikke av n8n selv, og kan være eldre enn nåværende versjoner. Du må sette opp egne tilganger til Gmail, Telegram og en KI-tjeneste, og gi dem tilgang til e-posten din. Vurder nøye hva du er komfortabel med.",
        ],
      },
    ],
  },

  "n8n-personlig-assistent": {
    lead: "En n8n-mal gir deg en personlig assistent på Telegram. Du kan sende tekst eller tale, og assistenten kan sammenfatte e-post, sjekke kalenderen og styre oppgavelisten din.",
    sections: [
      {
        heading: "Hva malen gjør",
        paragraphs: [
          "Du skriver eller snakker til en Telegram-bot. Hvis du sender tale, blir den først omgjort til tekst. Deretter tar en KI-agent over og velger hvilket verktøy den skal bruke.",
          "Agenten kan oppsummere uleste e-poster, sjekke hva du har i kalenderen og håndtere oppgaver i Google Tasks.",
        ],
      },
      {
        heading: "Hva du må sette opp",
        paragraphs: [
          "Malen krever flere tilganger: et token for Telegram-boten, nøkler til KI-tjenester og Google-innlogging. Det er derfor et prosjekt for deg som er komfortabel med litt teknisk oppsett.",
        ],
      },
      {
        heading: "Verdt å vite",
        paragraphs: [
          "Dette er en fellesskapsmal, ikke et ferdig produkt. Gi den bare tilgang til det du trenger, og lagre nøkler på en trygg måte. Del aldri tokens eller passord med andre.",
        ],
      },
    ],
  },

  "openclaw-hverdag": {
    lead: "I OpenClaws egen dokumentasjon nevnes oppsummeringer, research og utkast, påminnelser og nettleserautomatisering. Oppgaver du sender fra mobilen kjører på en server, og svaret kommer tilbake i chatten.",
    sections: [
      {
        heading: "Hva er OpenClaw?",
        paragraphs: [
          "OpenClaw er en personlig KI-assistent som du kommuniserer med gjennom chat. I dokumentasjonen svarer de på hva den kan brukes til, og listen er stort sett hverdagslig.",
        ],
      },
      {
        heading: "Bruksområdene som nevnes",
        paragraphs: [
          "Personlige oppsummeringer, for eksempel en samling av det som er viktig for deg. Research og utkast til tekster. Påminnelser. Automatisering av nettleseren, altså at assistenten klikker seg gjennom nettsider for deg.",
        ],
      },
      {
        heading: "Fra mobilen til serveren",
        paragraphs: [
          "En praktisk detalj er at du kan sende en oppgave fra telefonen. Selve jobben kjører på en server, og når den er ferdig, kommer svaret tilbake i chatten.",
        ],
      },
      {
        heading: "Dette bør du tenke på",
        paragraphs: [
          "Assistenter som kan styre nettleseren og lese beskjeder får tilgang til mye av livet ditt. Start med små, uskyldige oppgaver, og vær forsiktig med å gi tilgang til bank, betaling og sensitive opplysninger.",
        ],
      },
    ],
  },

  "egen-agent-telegram": {
    lead: "Med en utvidbar n8n-mal kan du bygge din egen personlige agent på Telegram. Den har tilgang til Gmail, kalender, Drive og nettsøk, husker samtalene og kan sende saker videre til et menneske.",
    sections: [
      {
        heading: "Hva malen inneholder",
        paragraphs: [
          "Malen er laget som et utgangspunkt for en personlig agent du kan bygge videre på. Den kobler Telegram til flere verktøy: e-post i Gmail, kalender, filer i Google Drive og søk på nettet.",
          "Samtalene lagres i en database, slik at agenten husker hva dere har snakket om tidligere. Den kan svare med talemeldinger, og den har en ordning for å sende en sak videre til en person når den ikke klarer den selv.",
        ],
      },
      {
        heading: "Hvorfor «egen agent»?",
        paragraphs: [
          "Ferdige tjenester gjør som oftest det leverandøren har bestemt. Med en mal som denne bestemmer du selv hvilke verktøy agenten får, og hva den skal gjøre. Du kan starte enkelt og legge til mer etter hvert.",
        ],
      },
      {
        heading: "Verdt å vite",
        paragraphs: [
          "Dette er den mest omfattende av malene: den krever mer oppsett enn enkle assistenter. Fordelen med å la et menneske overta er at du slipper å la agenten ta avgjørelser alene i saker som betyr noe.",
        ],
      },
    ],
  },
};
