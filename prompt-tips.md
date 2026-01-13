## Guide: Prompting för Utvecklare

För att få ut det mesta av en AI (som ChatGPT eller Claude) räcker det inte med att skriva "hjälp mig koda". Du behöver ge den rätt **kontext** och **instruktioner**.

### 1. Rollen (Vem ska AI:n vara?)

Ge AI:n en identitet. Det sätter nivån på språket och koden.

* **Exempel:** *"Du är en erfaren Senior Full Stack Developer med expertis inom React och Node.js. Du skriver ren, dokumenterad kod enligt 'Clean Code'-principer."*

### 2. Syfte & Bakgrund (Varför?)

Förklara projektet kortfattat så AI:n förstår sammanhanget.

* **Exempel:** *"Jag bygger en att-göra-app där användare ska kunna kategorisera uppgifter. Jag använder Vite, Tailwind CSS och Supabase."*

### 3. Mål & Förväntat Resultat (Vad?)

Var extremt tydlig med vad du vill ha ut. Är det ett script, en förklaring eller en tabell?

* **Exempel:** *"Skapa en React-komponent för ett inmatningsfält. Resultatet ska vara kod (JSX), en kort förklaring av logiken och ett exempel på hur komponenten importeras."*

### 4. No-Fly Zones (Vad ska AI:n INTE göra?)

Detta är avgörande för att slippa "gissningar" och trasig kod.

* **Gissa inte:** Om lösningen kräver ett bibliotek som inte finns, säg det.
* **Fråga om osäker:** *"Om min beskrivning är otydlig, ställ motfrågor innan du genererar kod."*
* **Ändra inte befintligt:** *"Rör inte den befintliga Auth-logiken, fokusera bara på UI-delen."*

### 5. RAG & Filer (Vilken data?)

Hänvisa till specifika filer eller dokumentation (Retrieval-Augmented Generation).

* **Exempel:** *"Här är min `App.jsx`. Utgå från temat i den filen när du skapar den nya komponenten."*

---

## 🛠 Mall: "Prompt-proffset" (Att kopiera)

Använd denna struktur när du skickar en uppgift till AI:n:

- **[ROLL]**: Du är en...
- **[KONTEXT]**: Jag jobbar med ett projekt som...
- **[UPPGIFT]**: Jag vill att du tar fram...
- **[BEGRÄNSNINGAR/NO-FLY]**: Gissa inte. Om du behöver använda externa paket, välj de mest stabila. Förklara koden rad för rad.
- **[FORMAT]**: Leverera svaret som [Kod/Text/Rapport].
- **[KONTROLL]**: Läs igenom din plan och sammanfatta stegen du tänker ta innan du genererar koden.

---

## Exempel på en bra prompt för en Full Stack-developer

**Mitt problem:** Behöver skapa en API-endpoint i Express för att spara användardata.

**Prompten:**

- "Du är en Senior Backend-utvecklare. Jag håller på att bygga en portfolio-sajt och behöver skapa en POST-endpoint i Express.js för ett kontaktformulär.
- **Mål:** Skapa en endpoint `/api/contact` som tar emot namn och e-post och sparar det i en lokal JSON-fil.
- **No-Fly Zones:** Använd inte externa databaser som MongoDB än, håll det enkelt med `fs`-modulen. Om koden kräver `body-parser` eller liknande middleware, inkludera det i exemplet. Gissa inte sökvägar, använd `./data.json`.
- **Process:** Innan du skriver koden, sammanfatta i tre punkter hur du tänker strukturera felhanteringen."

---

### Tips: "SPARA"-cykeln

1. **S** kriv prompten.
2. **P** röva koden.
3. **A** nalysera resultatet (Gör den vad den ska?).
4. **R** eflektera/Revidera (Om fel: peka ut felet för AI:n, be den inte be om ursäkt, be den bara fixa det).
5. **A** pplicera.
