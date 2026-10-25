
import re

FILE_PATH = 'src/data/useCases.ts'

NEW_CASES = [
    {
        'id': 'claude-code-ceo-chrome-utvidelse',
        'title': 'Claude Code som "CEO" for en gratis Chrome-utvidelse',
        'description': 'En utvikler ga Claude Code ansvaret for å styre en gratis Chrome-utvidelse. Hver kveld kl. 21:00 sjekker agenten dashbordet i Chrome Web Store, ser etter etterspørsel etter lignende verktøy, skriver kode og forbereder innlegg til sosiale medier. Utvikleren må godkjenne alt før det blir offentlig.',
        'agents': '["claude-code"]',
        'category': 'programvare-devops',
        'source': 'Reddit',
        'sourceDate': 'oktober 2026',
        'sourceUrl': 'https://www.reddit.com/r/buildinpublic/comments/1wutteu/week_1_of_letting_claude_run_my_free_chrome',
        'sourceChecked': 'true',
        'isNew': 'true',
        'dateAdded': '2026-10-22',
        'votes': '0',
        'curatedFrom': 'agentusecases.ai',
        'whatTheyDid': 'Utvikleren satte opp en automatisert arbeidsflyt der Claude Code fungerer som en uavhengig leder for et sideprosjekt. Agenten overvåker markedet, skriver kode og forbereder markedsføring.',
        'howItWent': 'I den første uken klarte agenten å oppdage et behov, foreslå en navneendring og sende ut en ny versjon som bestod over 122 automatiserte tester.',
        'worthKnowing': 'Krever en "man-in-the-loop"-tilnærming der utvikleren må gi klarsignal før noe blir offentlig.',
        'promptTemplate': 'Act as the CEO of my project [project name], a free [type of tool], for the next week. Look at the current state in [folder or repo] and propose three priorities for the week with reasons. Then build the first one in the code and write a short update on what changed. Anything public, like a post, a release, or a rename, needs my approval first, so show me the draft and wait.'
    },
    {
        'id': 'openclaw-klientprosjekt-gmail-notion',
        'title': 'Håndtering av klientprosjekter via Gmail, Kalender og Notion med OpenClaw',
        'description': 'En skribent koblet OpenClaw til Gmail, Google Calendar og Notion for å håndtere et klientprosjekt. Agenten sorterte innboksen etter viktighet, identifiserte overlappende møter og oppsummerte forskning direkte i Notion.',
        'agents': '["openclaw"]',
        'category': 'jobb-drift',
        'source': 'Medium',
        'sourceDate': 'oktober 2026',
        'sourceUrl': 'https://medium.com/age-of-awareness/i-let-openclaw-run-my-entire-workday-d4bea6597b1c',
        'sourceChecked': 'true',
        'isNew': 'true',
        'dateAdded': '2026-10-22',
        'votes': '0',
        'curatedFrom': 'agentusecases.ai',
        'whatTheyDid': 'Brukte en agent til å fungere som en personlig assistent for å organisere arbeidsflyten i flere verktøy samtidig.',
        'howItWent': 'Agenten produserte en 42-siders rapport på seks timer, men ga ett feilaktig tall i en rapport, så menneskelig kontroll er fortsatt nødvendig.',
        'worthKnowing': 'Kan spare dager med manuelt arbeid, men krever grundig verifisering av tall og data i starten.',
        'promptTemplate': 'Connect to my Gmail, Google Calendar and Notion and help me manage the project for [client name]. Find the overlapping meetings about [project] this week and propose how to merge them, draft the invites, and compile a summary of the research on [topic] into a Notion page. Show me the merged meeting plan and invite drafts before sending or changing anything; you\'re done when the Notion page exists and I\'ve approved the calendar changes.'
    }
]

TRENDING_NEW_IDS = ['egen-agent-telegram', 'gemini-husarbeid']
TRENDING_OLD_IDS = ['claude-code-visualisering', 'codex-nettleserspill']

def format_case(case):
    lines = [
        f'    {{',
        f'      id: "{case["id"]}",',
        f'      title: "{case["title"]}",',
        f'      description: "{case["description"]}",',
        f'      agents: {case["agents"]},',
        f'      category: "{case["category"]}",'
    ]
    
    if case['id'] in TRENDING_NEW_IDS:
        lines.append('      trending: true,')
        
    lines.extend([
        f'      source: "{case["source"]}",',
        f'      sourceDate: "{case["sourceDate"]}",',
        f'      sourceUrl: "{case["sourceUrl"]}",',
        f'      sourceChecked: {case["sourceChecked"]},',
        f'      isNew: {case["isNew"]},',
        f'      dateAdded: "{case["dateAdded"]}",',
        f'      votes: {case["votes"]},',
        f'      curatedFrom: "{case["curatedFrom"]}",',
        f'      whatTheyDid: "{case["whatTheyDid"]}",',
        f'      howItWent: "{case["howItWent"]}",',
        f'      worthKnowing: "{case["worthKnowing"]}",',
    ])
    
    if 'promptTemplate' in case:
        lines.append(f'      promptTemplate: "{case["promptTemplate"]}",')
    
    lines.append('    },')
    return '\n'.join(lines)

def run_update():
    with open(FILE_PATH, 'r') as f:
        content = f.read()

    # 1. Remove trending: true from old ones
    for old_id in TRENDING_OLD_IDS:
        # Find the block containing the id and remove the trending: true line
        # This is a bit tricky with regex, let's find the line with id and then look for trending: true within a few lines
        pattern = rf'(id: "{old_id}",.*?)(trending: true,)'
        # Using dotall to match across lines
        content = re.sub(pattern, r'\1', content, flags=re.DOTALL)

    # 2. Add trending: true to new ones (if they are already in the file, but here they are NEW)
    # Wait, the new ones are not in the file yet. So I just include them in the format_case.

    # 3. Insert new cases at the top
    new_cases_str = '\n'.join([format_case(c) for c in NEW_CASES])
    
    # Find the opening bracket of the array
    bracket_match = re.search(r'export const useCases: UseCase\[\s*=\s*\[', content)
    if bracket_match:
        pos = bracket_match.end()
        # We want to insert after the bracket and potentially after a newline
        content = content[:pos] + '\n' + new_cases_str + '\n' + content[pos:]
    else:
        print("Error: Could not find useCases array start")
        return

    with open(FILE_PATH, 'w') as f:
        f.write(content)
    print("Successfully updated useCases.ts")

if __name__ == "__main__":
    run_update()
