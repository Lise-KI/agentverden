import json

new_items = [
    {
        "id": "formelt-verifisering-av-programvare-med-claude",
        "title": "Formell verifisering av programvare med Claude",
        "description": "Anthropic sitt 'red team' brukte Claude til å matematisk bevise at 123 åpne kildekode-biblioteker ikke krasjer, og fant hundrevis av feil underveis i prosessen.",
        "agents": ["claude"],
        "category": "sikkerhet-vitenskap",
        "source": "Bluesky",
        "sourceDate": "oktober 2026",
        "sourceUrl": "https://bsky.app/profile/anthropicai.xmirror.bot/post/3myiqdszacz2f",
        "sourceChecked": True,
        "isNew": True,
        "dateAdded": "2026-10-25",
        "votes": 0,
        "curatedFrom": "agentusecases.ai",
        "whatTheyDid": "Anthropic sitt Frontier Red Team forvandlet eksisterende fuzz-tester til formelle bevis. Claude skrev de formelle bevisene, som en 'proof checker' deretter verifiserte linje for linje. Prosessen beviste at 239 inngangspunkter i 123 biblioteker ikke kan krasje, noe som tilsvarer omtrent 180 millioner linjer med bevis.",
        "howItWent": "Underveis i arbeidet ble det oppdaget hundrevis av faktiske bugs i bibliotekene som bevisene ble skrevet for. En utfordring er at hvert bevis kan kreve enorme mengder tokens, og foreløpig dekker metoden kun single-threaded RISC-V-programmer.",
        "worthKnowing": "Dette er et enormt sprang for programvarepålitelighet. I stedet for å bare teste at noe fungerer, kan man nå matematisk bevise at visse feiltyper er umulige.",
        "promptTemplate": "Jeg vil bruke Claude til å utføre formell verifisering på [bibliotek eller modul i min kodebase]. Bruk [spesifikt verktøy for bevis] til å skrive formelle spesifikasjoner og bevis som sikrer at [spesifikk feiltype, f.eks. out-of-bounds access] er umulig. Kjør bevisene, verifiser dem mot [proof checker], og gi meg en rapport som lister opp hva som ble bevist og hvilke eventuelle bugs som ble funnet. Ikke endre kildekoden min uten at jeg har sett og godkjent endringene først."
    },
    {
        "id": "bestill-en-hel-reise-med-ett-instruks",
        "title": "Bestill en hel reise med ett instruks",
        "description": "En AI-reiseplanlegger klarte å sette sammen, bestille og betale for en hel tur (fly, hotell og leiebil) basert på en enkelt, kort instruks, uten menneskelig inngripen.",
        "agents": ["chatgpt-agent"],
        "category": "reise-bestilling",
        "source": "Contraco",
        "sourceDate": "oktober 2026",
        "sourceUrl": "https://contraco.net/the-booking-you-never-saw.html",
        "sourceChecked": True,
        "isNew": True,
        "dateAdded": "2026-10-25",
        "votes": 0,
        "curatedFrom": "agentusecases.ai",
        "whatTheyDid": "Et team ga en reiseagent én kort instruks med begrensninger: to reisende, torsdag til søndag i Miami, et hotell i gangavstand fra stranden (men ikke på 'The Strip'), og en leiebil utenfor byen. Agenten satte sammen reisen, bestilte og betalte for alle delene.",
        "howItWent": "Alt ble bekreftet (fly, hotell og bil). Det mest interessante var at ingen av leverandørene så kundens detaljer — de mottok kun en forespørsel og en betaling, noe som omgår tradisjonell sporing og markedsføring.",
        "worthKnowing": "Dette viser hvordan agenter kan fungere som den nye 'velgeren' i reisebransjen. Når agenter tar beslutninger på vegne av mennesker, kan det endre hele dynamikken for hvordan hoteller og flyselskaper når ut til kunder via digital markedsføring.",
        "promptTemplate": ""
    },
    {
        "id": "publiser-innhold-pa-18-plattformer-med-ai-agenter",
        "title": "Publiser innhold på 18 plattformer med AI-agenter",
        "description": "En gründer lot AI-agenter styre sosiale medier helt autonomt, noe som resulterte i 220 innlegg på tvers av 18 forskjellige plattformer uten menneskelig hjelp.",
        "agents": ["egen-agent"],
        "category": "salg-markedsforing",
        "source": "Reddit",
        "sourceDate": "oktober 2026",
        "sourceUrl": "https://www.reddit.com/r/EntrepreneurRideAlong/comments/1sc6itg/day_40_our_ai_agents_posted_220_times_across_18",
        "sourceChecked": True,
        "isNew": True,
        "dateAdded": "2026-10-25",
        "votes": 0,
        "curatedFrom": "agentusecases.ai",
        "whatTheyDid": "Ved å la agentene overvåke en database, oppdaget gründeren at de hadde postet 220 ganger på 40 dager på plattformer som TikTok, YouTube, LinkedIn, Reddit og X. Ingen av disse innleggene var laget eller godkjent av et menneske.",
        "howItWent": "Av de 220 postene var 195 bekreftet som live (83 % treffrate). De fleste feilene skyldtes tekniske problemer med nettleserautomatisering eller utløpte pålogginger, ikke selve innholdet.",
        "worthKnowing": "Selv om skalaen er enorm, viser det at påliteligheten fortsatt er en utfordring. Det kreves overvåking av tekniske feil (som innlogginger) selv om selve innholdsproduksjonen er automatisert.",
        "promptTemplate": ""
    }
]

trending_to_add = ["investeringsanalyse", "lag-en-animert-musikal-med-claude-code"]
cleanup_date = "2026-10-20"

with open('src/data/useCases.ts', 'r') as f:
    content = f.read()

start = content.find('[')
end = content.find('];')
if start == -1 or end == -1:
    end = content.rfind(']')

array_str = content[start:end+1]
use_cases = json.loads(array_str)

trending_to_remove = []
for uc in use_cases:
    if uc.get('trending') is True:
        trending_to_remove.append(uc['id'])

use_cases = new_items + use_cases

for uc in use_cases:
    if uc.get('isNew') and uc.get('dateAdded', '9999') < cleanup_date:
        uc['isNew'] = False
    if uc['id'] in trending_to_remove:
        uc['trending'] = False
    if uc['id'] in trending_to_add:
        uc['trending'] = True

prefix = content[:start]
suffix = content[end:]
new_content = prefix + json.dumps(use_cases, indent=2, ensure_ascii=False) + suffix
with open('src/data/useCases.ts', 'w') as f:
    f.write(new_content)

with open('daily-update/log.json', 'r') as f:
    log = json.load(f)

new_run = {
    "date": "2026-10-25",
    "addedUseCases": [
        {"id": item["id"], "title": item["title"], "category": item["category"], "sourcePrimaryUrl": item["sourceUrl"], "curatedFromListingUrl": "https://agentusecases.ai"} 
        for item in new_items
    ],
    "changesOther": "isNew-opprydding utført. Trending rotert.",
    "trendingSelected": trending_to_add,
    "trendingReplaced": trending_to_remove,
    "selfApprovalChecks": [
        {
            "id": item["id"],
            "duplicateCheck": "pass",
            "spellingCheck": "pass",
            "norwegianCheck": "pass",
            "sourceUrlCheck": "pass"
        } for item in new_items
    ],
    "gitCommit": "PENDING",
    "emailedReportTo": "andreassf1@gmail.com"
}
log['runs'].append(new_run)

with open('daily-update/log.json', 'w') as f:
    json.dump(log, f, indent=2, ensure_ascii=False)

print("SUCCESS")
