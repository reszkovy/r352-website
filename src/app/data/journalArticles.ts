import deliveryOSImage from "figma:asset/f5bde9dbf97a6173262b508893d89c9f53e04258.png";
import calmExecutionImage from "figma:asset/04b8212c348ba87b31f3fb0fdf4b1e2cf2d7e8f3.png";
import cadenceImage from "figma:asset/00ba10d702fb047d9a6ba4780de74db73f7e5403.png";

export interface Article {
  id: number;
  title: string;
  title_pl?: string;
  date: string;
  category: string;
  image: string;
  content: string; // HTML or Markdown content
  content_pl?: string;
}

export const journalArticles: Article[] = [
  {
    id: 5,
    title: "The Cadence<br/>Advantage:<br/>Rhythm is Speed",
    title_pl: "Przewaga Kadencji:<br/>Rytm to Szybkość",
    date: "Mar 2026",
    category: "Process",
    image: cadenceImage,
    content_pl: `
      <p class="mb-6 text-xl leading-relaxed text-neutral-300">
        Oto prosta obserwacja z ostatnich kilku lat pracy zdalnej - między krajami, między klientami, między różnymi team setupami.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Większość firm nie ma problemu z talentami. <span class="text-white font-medium">Mają problem z rytmem.</span>
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Jeden tydzień spokojnie. Potem nagle wszystko to "ASAP".
        Raz jest miejsce do myślenia, następnie Slack kieruje dniem.
        W tym trybie nie możesz utrzymać wysokiej jakości, nie możesz pozostać spokojny, i nie możesz być sensownie responsywny.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Przewaga nie jest "bycie szybkim". <span class="text-white border-b border-[#D4FF00]/50">Przewaga jest kadencja - stały rytm dostarczania.</span>
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Pilność wygląda jak szybkość.<br/>Kadencja to szybkość.</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        "ASAP" daje ludziom poczucie kontroli.
        W rzeczywistości "ASAP" to zwykle sygnał, że nie ma żadnego systemu.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Pilność tworzy ruch, nie postęp. Produkuje:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>ciągłe przełączanie kontekstu</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>decyzje podejmowane za późno</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>feedback bez kryteriów</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>ostateczne zmiany, które psują całość</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>"prawie gotowa" praca, która nigdy nie staje się gotowa do publikacji</span></li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Kadencja robi coś odwrotnego. Normalizuje dostarczanie.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Gdy jest rytm, "pilne" wraca do tego, czym powinno być - wyjątkiem, a nie domyślnym trybem działania.
      </p>

      <div class="my-16 border-l-2 border-[#D4FF00] pl-6 md:pl-8">
        <h3 class="font-display text-[#D4FF00] text-3xl md:text-5xl uppercase tracking-tighter leading-[0.9]">
          Balans w pracy zdalnej<br/>to przewidywalne obciążenie
        </h3>
      </div>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Mam rodzinę, bloki deep work, i życie poza ekranem.
        Gdy praca jest przypadkowa, nawet mała lista zadań wydaje się cięższa niż duża.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Ponieważ twój mózg pozostaje w "trybie oczekiwania" - co się zmieni w następnej chwili?
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Przewidywalność to to, co tworzy balans:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>wiesz, kiedy dzieje się deep work</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>wiesz, kiedy dzieje się feedback</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>wiesz, kiedy podejmowane są decyzje</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>wiesz, kiedy rzeczy się wysyłają</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>wiesz, kiedy jesteś offline</span></li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        To nie jest motywacyjna pogadanka. To przewaga operacyjna.
        Bez niej, jakość zaczyna się pękać i dostarczanie staje się nerwowe.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Cotygodniowe dostarczanie to najprostszy sposób<br/>aby jakość nie dryftowała</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Jakość nie spada, bo ludziom brakuje umiejętności.
        Spada, bo wszystko staje się ad hoc.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Ad hoc zabija standardy:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>każde dostarczenie wygląda inaczej</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>nazewnictwo i formaty dryftują</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>QA staje się "jeśli mamy czas"</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>handoff staje się "dodam to później"</span></li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        I wtedy dostajesz klasyczny wynik: dużo pracy, ale output wygląda jakby przyszedł od pięciu różnych osób.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Cotygodniowy rytm zmusza do repetycji. Repetycja zmusza do systemu.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        I naturalnie zaczynasz budować:
      </p>
      <div class="flex flex-wrap gap-3 mb-10">
          <span class="px-4 py-2 border border-white/10 rounded-full text-sm text-neutral-300">Templates</span>
          <span class="px-4 py-2 border border-white/10 rounded-full text-sm text-neutral-300">Checklists</span>
          <span class="px-4 py-2 border border-white/10 rounded-full text-sm text-neutral-300">Handoff Packs</span>
          <span class="px-4 py-2 border border-white/10 rounded-full text-sm text-neutral-300">Components</span>
          <span class="px-4 py-2 border border-white/10 rounded-full text-sm text-neutral-300">Quality Rules</span>
       </div>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        To wtedy "premium" przestaje być cechą osobowości i staje się standardem.
      </p>

      <div class="my-16 bg-neutral-900/50 p-8 md:p-12 border border-white/5 relative overflow-hidden">
        <div class="absolute top-0 right-0 p-4 opacity-10 font-display text-9xl leading-none text-[#D4FF00] pointer-events-none select-none">RHYTHM</div>
        <h3 class="relative z-10 font-display text-white text-2xl uppercase tracking-widest mb-8">Jak kadencja wygląda w praktyce</h3>
        <p class="relative z-10 text-neutral-400 text-sm mb-8">Nie musi być skomplikowane. Potrzebujesz tylko struktury.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
            <div class="bg-black/40 p-5 border-l-2 border-[#D4FF00]">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">01. Jedna Ścieżka Intake</strong>
                <p class="text-neutral-400 text-sm">Zgłoszenia nie przychodzą przez DM-y i losowe wątki. Jedno miejsce. Zawsze.</p>
            </div>
            <div class="bg-black/40 p-5 border-l-2 border-neutral-700 hover:border-[#D4FF00] transition-colors">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">02. Brief, który Ma Sens</strong>
                <p class="text-neutral-400 text-sm">Cel, audience, ograniczenia, przykłady, definicja done. Krótki, ale rzeczywisty.</p>
            </div>
            <div class="bg-black/40 p-5 border-l-2 border-neutral-700 hover:border-[#D4FF00] transition-colors">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">03. Właściciel Decyzji</strong>
                <p class="text-neutral-400 text-sm">Jedna osoba, która może powiedzieć tak/nie. Bez tego, feedback nigdy się nie kończy.</p>
            </div>
            <div class="bg-black/40 p-5 border-l-2 border-neutral-700 hover:border-[#D4FF00] transition-colors">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">04. Okna Feedbacku</strong>
                <p class="text-neutral-400 text-sm">Feedback nie kapie przez cały dzień. Dzieje się w slotach. W formacie. Z kryteriami.</p>
            </div>
            <div class="bg-black/40 p-5 border-l-2 border-neutral-700 hover:border-[#D4FF00] transition-colors">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">05. Standard Pakowania</strong>
                <p class="text-neutral-400 text-sm">Nie "gotowe w Figmie". Gotowe do publikacji: pliki, nazewnictwo, warianty, specyfikacje, notatki handoff.</p>
            </div>
            <div class="bg-black/40 p-5 border-l-2 border-[#D4FF00]">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">06. Cotygodniowy Rytm</strong>
                <p class="text-neutral-400 text-sm">Każdego tygodnia wysyłasz coś rzeczywistego. Nie "postęp". Output.</p>
            </div>
        </div>
        <p class="relative z-10 text-neutral-400 text-sm mt-8">To tyle. Wszystko inne to szczegóły.</p>
      </div>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Responsywność bez wypalenia</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Responsywność to nie siedzenie online przez 12 godzin.
        Responsywność to usunięcie niepewności z procesu - szybko.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Dla mnie responsywność oznacza:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>wyjaśnij zgłoszenie szybko</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>wyrównaj decyzje szybko</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>dostarcz następny użyteczny krok szybko</span></li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Kadencja czyni to możliwym, ponieważ każdy wie, co jest następne i kiedy.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Bez rytmu, nawet najbar "responsywna" osoba zmienia się w support.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Spokojne wykonanie<br/>to rzeczywiste premium</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Teamy nie chcą tylko "szybko".
        Chcą szybko bez chaosu.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Chcą czuć:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>jakość jest chroniona</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>standardy pozostają spójne</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>dostarczanie jest przewidywalne</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>zatwierdzenia nie zamieniają się w dramat</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>nic nie zależy od paniki i heroizmu</span></li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        To jest to, co kadencja Ci daje.
      </p>

      <p class="font-display text-white text-2xl uppercase tracking-wider my-8">
        Szybkość staje się nawykiem. Jakość staje się bazą. I system się utrzymuje - nawet gdy robi się pracowicie.
      </p>

      <hr class="my-16 border-white/10" />

      <div class="bg-neutral-900 border border-white/5 p-8 md:p-12 text-center">
         <p class="text-lg text-neutral-400 max-w-2xl mx-auto mb-4">
            Jeśli Twoje tygodnie wyglądają jak seria pożarów "ASAP", nie potrzebujesz większej presji. Potrzebujesz rytmu.
         </p>
         <p class="font-display text-[#D4FF00] text-4xl md:text-5xl uppercase tracking-tighter leading-none">
            Kadencja najpierw.<br/>Potem wszystko inne zaczyna działać.
         </p>
      </div>
`,
    content: `
      <p class="mb-6 text-xl leading-relaxed text-neutral-300">
        Here’s a simple observation from the last few years of working remotely - across countries, across clients, across different team setups.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Most companies don’t have a talent problem. <span class="text-white font-medium">They have a rhythm problem.</span>
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        One week it’s quiet. Then suddenly everything is “ASAP”.
        One moment there’s space to think, the next moment Slack is running the day.
        And in that mode you can’t keep quality high, you can’t stay calm, and you can’t be meaningfully responsive.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        The advantage isn’t “being fast”. <span class="text-white border-b border-[#D4FF00]/50">The advantage is cadence - a steady shipping rhythm.</span>
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Urgency looks like speed.<br/>Cadence is speed.</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        “ASAP” gives people a feeling of control.
        In reality, “ASAP” is usually a signal that there is no system.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Urgency creates motion, not progress. It produces:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>constant context switching</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>decisions made too late</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>feedback without criteria</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>last-minute changes that break the whole thing</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>“almost ready” work that never becomes publish-ready</span></li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Cadence does the opposite. It normalizes shipping.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        When there’s a rhythm, “urgent” goes back to what it should be - an exception, not the default operating mode.
      </p>

      <div class="my-16 border-l-2 border-[#D4FF00] pl-6 md:pl-8">
        <h3 class="font-display text-[#D4FF00] text-3xl md:text-5xl uppercase tracking-tighter leading-[0.9]">
          Balance in remote work<br/>is predictable load
        </h3>
      </div>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        I have a family, deep work blocks, and a life outside the screen.
        When work is random, even a small task list feels heavier than a big one.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Because your brain stays in “waiting mode” - what’s going to drop next?
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Predictability is what creates balance:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>you know when deep work happens</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>you know when feedback happens</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>you know when decisions happen</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>you know when things ship</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>you know when you’re offline</span></li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        This isn’t motivational talk. It’s operational advantage.
        Without it, quality starts to crack and delivery becomes nervous.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Weekly shipping is the simplest way<br/>to keep quality from drifting</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Quality doesn’t drop because people lack skill.
        It drops because everything becomes ad hoc.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Ad hoc kills standards:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>every delivery looks different</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>naming and formats drift</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>QA becomes “if we have time”</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>handoff becomes “I’ll add it later”</span></li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        And then you get the classic outcome: a lot of work, but the output looks like it came from five different people.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        A weekly rhythm forces repetition. Repetition forces a system.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        And naturally you start building:
      </p>
      <div class="flex flex-wrap gap-3 mb-10">
          <span class="px-4 py-2 border border-white/10 rounded-full text-sm text-neutral-300">Templates</span>
          <span class="px-4 py-2 border border-white/10 rounded-full text-sm text-neutral-300">Checklists</span>
          <span class="px-4 py-2 border border-white/10 rounded-full text-sm text-neutral-300">Handoff Packs</span>
          <span class="px-4 py-2 border border-white/10 rounded-full text-sm text-neutral-300">Components</span>
          <span class="px-4 py-2 border border-white/10 rounded-full text-sm text-neutral-300">Quality Rules</span>
       </div>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        That’s when “premium” stops being a personality trait and becomes a standard.
      </p>

      <div class="my-16 bg-neutral-900/50 p-8 md:p-12 border border-white/5 relative overflow-hidden">
        <div class="absolute top-0 right-0 p-4 opacity-10 font-display text-9xl leading-none text-[#D4FF00] pointer-events-none select-none">RHYTHM</div>
        <h3 class="relative z-10 font-display text-white text-2xl uppercase tracking-widest mb-8">What cadence looks like in practice</h3>
        <p class="relative z-10 text-neutral-400 text-sm mb-8">It doesn’t need to be complicated. You just need a backbone.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
            <div class="bg-black/40 p-5 border-l-2 border-[#D4FF00]">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">01. One Intake Path</strong>
                <p class="text-neutral-400 text-sm">Requests don’t arrive through DMs and random threads. One place. Always.</p>
            </div>
            <div class="bg-black/40 p-5 border-l-2 border-neutral-700 hover:border-[#D4FF00] transition-colors">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">02. A Brief That Makes Sense</strong>
                <p class="text-neutral-400 text-sm">Goal, audience, constraints, examples, definition of done. Short, but real.</p>
            </div>
            <div class="bg-black/40 p-5 border-l-2 border-neutral-700 hover:border-[#D4FF00] transition-colors">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">03. A Decision Owner</strong>
                <p class="text-neutral-400 text-sm">One person who can say yes/no. Without this, feedback never ends.</p>
            </div>
            <div class="bg-black/40 p-5 border-l-2 border-neutral-700 hover:border-[#D4FF00] transition-colors">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">04. Feedback Windows</strong>
                <p class="text-neutral-400 text-sm">Feedback doesn’t drip all day. It happens in slots. In a format. With criteria.</p>
            </div>
            <div class="bg-black/40 p-5 border-l-2 border-neutral-700 hover:border-[#D4FF00] transition-colors">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">05. A Packaging Standard</strong>
                <p class="text-neutral-400 text-sm">Not “done in Figma”. Publish-ready: files, naming, variants, specs, handoff notes.</p>
            </div>
            <div class="bg-black/40 p-5 border-l-2 border-[#D4FF00]">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">06. Weekly Rhythm</strong>
                <p class="text-neutral-400 text-sm">Every week you ship something real. Not “progress”. Output.</p>
            </div>
        </div>
        <p class="relative z-10 text-neutral-400 text-sm mt-8">That’s it. Everything else is detail.</p>
      </div>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Responsiveness without burnout</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Responsiveness isn’t sitting online for 12 hours.
        Responsiveness is removing uncertainty from the process - fast.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        For me, responsiveness means:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>clarify the request fast</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>align decisions fast</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>deliver the next usable step fast</span></li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Cadence makes this possible because everyone knows what’s next and when.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Without rhythm, even the most “responsive” person turns into support.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Calm execution<br/>is the real premium</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Teams don’t only want “fast”.
        They want fast without chaos.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        They want to feel:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>quality is protected</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>standards stay consistent</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>delivery is predictable</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>approvals don’t turn into drama</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>nothing depends on panic and heroics</span></li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        That’s what cadence gives you.
      </p>

      <p class="font-display text-white text-2xl uppercase tracking-wider my-8">
        Speed becomes a habit. Quality becomes the baseline. And the system holds - even when things get busy.
      </p>

      <hr class="my-16 border-white/10" />

      <div class="bg-neutral-900 border border-white/5 p-8 md:p-12 text-center">
         <p class="text-lg text-neutral-400 max-w-2xl mx-auto mb-4">
            If your weeks feel like a series of “ASAP” fires, you don’t need more pressure. You need rhythm.
         </p>
         <p class="font-display text-[#D4FF00] text-4xl md:text-5xl uppercase tracking-tighter leading-none">
            Cadence first.<br/>Then everything else starts working.
         </p>
      </div>
    `
  },
  {
    id: 4,
    title: "Calm Execution:<br/>Remote Work<br/>Without Chaos",
    title_pl: "Spokojna Realizacja:<br/>Praca Zdalna<br/>Bez Chaosu",
    date: "Feb 2026",
    category: "Operating Model",
    image: calmExecutionImage,
    content_pl: `
      <p class="mb-6 text-xl leading-relaxed text-neutral-300">
        Praca zdalna nie jest problemem. <span class="text-white font-medium border-b border-[#D4FF00]/50">Brak struktury jest.</span>
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Pracowałem zdalnie przez lata w różnych krajach. Różni klienci, różne strefy czasowe, różne poziomy chaosu. Zawsze jednak pojawia się ten sam wzorzec: gdy dostarczanie się komplikuje, ludzie obwiniają o to "pracę zdalną".
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Ale rzeczywisty problem jest prostszy: prace trafiają do zespołu w nieustrukturyzowany sposób, decyzje nie mają właścicieli, a feedback nie ma reguł. Praca zdalna po prostu nie pozwala tego ukryć.
      </p>

      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Dbam o dwie rzeczy w tym setup:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-center gap-3"><span class="text-[#D4FF00] text-xs">●</span> <span>wysokiej jakości output</span></li>
        <li class="flex items-center gap-3"><span class="text-[#D4FF00] text-xs">●</span> <span>szybkie, spokojne dostarczanie, które nie pochłania ci życia</span></li>
      </ul>

      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Ta kombinacja nie jest cechą osobowości. <span class="text-white">To jest system.</span>
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Praca zdalna nie potrzebuje więcej spotkań.<br/>Potrzebuje mniej niewiadomych.</h2>

      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Większość zespołów próbuje rozwiązać tarcia związane z pracą zdalną poprzez więcej rozmów. Więcej synchronizacji. Więcej statusów. Więcej "szybkich check-inów".
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Wydaje się to odpowiedzialne, ale zwykle oznacza jedną rzecz: nie masz systemu decyzyjnego.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Wyrównanie nie chodzi o bycie razem na Zoom. Wyrównanie to sytuacja, gdy zespół może odpowiedzieć natychmiast:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>co dostarczamy?</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>dlaczego to ważne?</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>co oznacza "gotowe"?</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>kto mówi tak/nie?</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>gdzie jest źródło prawdy?</span></li>
      </ul>

      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Jeśli te odpowiedzi istnieją, praca zdalna staje się cicha i szybka. Jeśli ich nie ma, nawet najlepsi ludzie tonęli.
      </p>

      <div class="my-16 border-l-2 border-[#D4FF00] pl-6 md:pl-8">
        <h3 class="font-display text-[#D4FF00] text-3xl md:text-5xl uppercase tracking-tighter leading-[0.9]">
          Balans to przewidywalne obciążenie,<br/>nie wolny czas.
        </h3>
      </div>

      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Ludzie mówią o "work-life balance" jak o plakacie motywacyjnym.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        W rzeczywistym życiu - szczególnie gdy budujesz coś poważnego i masz rodzinę - balans pochodzi z przewidywalności:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>wiesz, kiedy następuje deep work</span></li>
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>wiesz, kiedy następuje koordynacja</span></li>
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>wiesz, kiedy prace się dostarczają</span></li>
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>wiesz, kiedy nie pracujesz</span></li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Praca zdalna bez struktury to coś przeciwnego: wszystko jest zawsze lekko włączone. To nie jest zrównoważone. I zabija jakość.
      </p>
      <p class="font-display text-white text-2xl uppercase tracking-wider my-8">Spokojna realizacja nie jest wolniejsza. Jest mniej chaotyczna.</p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Rzeczywistym wrogiem zespołów zdalnych<br/>są otwarte pętle</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Otwarte pętle to ukryty podatek nowoczesnej pracy:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>briefs, które nie definiują sukcesu</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>prośby wrzucane do DM</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>feedback, który to tylko uczucie</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>decyzje podjęte w prywatnych wątkach</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>pliki rozrzucone po narzędziach</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>"ostateczne" które nigdy nie staje się ostateczne</span></li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        To nie tylko cię spowalnia. To drażni uwagę. Jeśli chcesz szybkości bez wypalenia, twoja praca jest prosta: zamykaj pętle wcześnie, na wszelki wypadek, za każdym razem.
      </p>

      <div class="my-16 bg-neutral-900/50 p-8 md:p-12 border border-white/5 relative overflow-hidden">
        <div class="absolute top-0 right-0 p-4 opacity-10 font-display text-9xl leading-none text-[#D4FF00] pointer-events-none select-none">REMOTE</div>
        <h3 class="relative z-10 font-display text-white text-2xl uppercase tracking-widest mb-8">Model operacyjny pracy zdalnej, który faktycznie działa</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
            <div class="bg-black/40 p-5 border-l-2 border-[#D4FF00]">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">01. Jedna ścieżka wpływu</strong>
                <p class="text-neutral-400 text-sm">Prośby nie przychodzą wszędzie. Jeden punkt wejścia. Zawsze.</p>
            </div>
            <div class="bg-black/40 p-5 border-l-2 border-neutral-700 hover:border-[#D4FF00] transition-colors">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">02. Rzeczywisty standard brief</strong>
                <p class="text-neutral-400 text-sm">Nie formularz. Użyteczny input: cel, odbiorcy, ograniczenia, przykłady, definicja gotowości.</p>
            </div>
            <div class="bg-black/40 p-5 border-l-2 border-neutral-700 hover:border-[#D4FF00] transition-colors">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">03. Właściciel decyzji</strong>
                <p class="text-neutral-400 text-sm">Jedna osoba, która może zaaprobować. Jeśli nikt nie jest właścicielem decyzji, dostajesz nieskończoną feedback.</p>
            </div>
            <div class="bg-black/40 p-5 border-l-2 border-neutral-700 hover:border-[#D4FF00] transition-colors">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">04. Okna feedback</strong>
                <p class="text-neutral-400 text-sm">Feedback to zaplanowane wydarzenie, nie ciągły strumień. Format i kryteria mają znaczenie.</p>
            </div>
            <div class="bg-black/40 p-5 border-l-2 border-neutral-700 hover:border-[#D4FF00] transition-colors">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">05. Standard pakowania</strong>
                <p class="text-neutral-400 text-sm">Każde dostarczenie wygląda tak samo: pliki, nazewnictwo, warianty, specyfikacje - gotowe do publikacji.</p>
            </div>
            <div class="bg-black/40 p-5 border-l-2 border-[#D4FF00]">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">06. Kadencja wysyłki</strong>
                <p class="text-neutral-400 text-sm">Tygodniowy rytm pokonuje heroiczne wysiłki. Jeśli wszystko jest "ASAP", nic nie jest.</p>
            </div>
        </div>
      </div>

      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        To różnica między byciem "zajętym" a faktycznie dostarczaniem.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Responsywność to nie<br/>bycie online 24/7</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        To jest ważne. Responsywność to zdolność, nie styl życia.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Dla mnie responsywność oznacza:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>wyjaśnij prośbę szybko</span></li>
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>usuń niepewność szybko</span></li>
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>dostarcz następny użyteczny krok szybko</span></li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Możesz to zrobić bez bycia dostępnym całý dzień - jeśli twój workflow jest do tego zbudowany. Jeśli twój workflow nie jest do tego zbudowany, możesz być online 12 godzin i wciąż być wolny.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Jakość to nie gust.<br/>To jest standard.</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        W setupach zdalnych jakość dryftuje, chyba że aktywnie to zapobiegasz. Rozwiązaniem nie jest "zatrudniaj lepszych ludzi". Rozwiązaniem są standardy, które się przenoszą:
      </p>
       <div class="flex flex-wrap gap-3 mb-10">
          <span class="px-4 py-2 border border-white/10 rounded-full text-sm text-neutral-300">Templates</span>
          <span class="px-4 py-2 border border-white/10 rounded-full text-sm text-neutral-300">Component Libraries</span>
          <span class="px-4 py-2 border border-white/10 rounded-full text-sm text-neutral-300">Checklists</span>
          <span class="px-4 py-2 border border-white/10 rounded-full text-sm text-neutral-300">QA Gates</span>
          <span class="px-4 py-2 border border-white/10 rounded-full text-sm text-neutral-300">Flexible vs Fixed Rules</span>
       </div>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        To też jest to, jak praca "się starzeje dobrze". Nie poprzez bycie modnym - poprzez bycie spójnym i konserwowanym.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Co robię najpierw, gdy dołączam do zespołu zdalnego</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Nie zaczynam w Figma. Zaczynam od pięciu pytań:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>gdzie wchodzą prośby?</span></li>
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>kto decyduje?</span></li>
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>co oznacza "gotowe"?</span></li>
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>jak wygląda "gotowe do publikacji" tutaj?</span></li>
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>jaką kadencję możemy utrzymać bez stresu?</span></li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Raz te pytania zostają udzielone, wszystko staje się lżejsze: mniej spotkań, mniej rewizji, szybsze zatwierdzenia, czystsze handoffs, wyższa spójność.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        I paradoksalnie - więcej kreatywnej energii, bo nie wydajesz jej na koordynację.
      </p>

      <hr class="my-16 border-white/10" />

      <div class="bg-neutral-900 border border-white/5 p-8 md:p-12 text-center">
         <p class="font-display text-white text-3xl uppercase tracking-widest mb-4">Praca zdalna może być spokojna.</p>
         <p class="font-display text-[#D4FF00] text-4xl md:text-5xl uppercase tracking-tighter leading-none mb-8">Ale spokój jest inżynierowany.</p>
         <p class="text-lg text-neutral-400 max-w-2xl mx-auto">
            Jeśli chcesz premium output z szybkim dostarczaniem, przestań próbować "zarządzać zdalnie". Zbuduj model operacyjny, który sprawia, że jakość i szybkość są przewidywalne.
         </p>
      </div>
`,
    content: `
      <p class="mb-6 text-xl leading-relaxed text-neutral-300">
        Remote work isn’t the problem. <span class="text-white font-medium border-b border-[#D4FF00]/50">Lack of structure is.</span>
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        I’ve worked remote across countries for years. Different clients, different time zones, different levels of chaos. And the pattern is always the same: when delivery gets messy, people blame “remote”.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        But the real issue is simpler: work enters the team in an unstructured way, decisions don’t have owners, and feedback has no rules. Remote just makes that impossible to hide.
      </p>

      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        I care about two things in this setup:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-center gap-3"><span class="text-[#D4FF00] text-xs">●</span> <span>high quality output</span></li>
        <li class="flex items-center gap-3"><span class="text-[#D4FF00] text-xs">●</span> <span>fast, calm delivery that doesn’t eat your life</span></li>
      </ul>

      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        That combination is not a personality trait. <span class="text-white">It’s a system.</span>
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Remote doesn’t need more meetings.<br/>It needs fewer unknowns.</h2>

      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Most teams try to solve remote friction with more calls. More syncing. More status. More “quick check-ins”.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        It feels responsible, but it usually means one thing: you don’t have a decision system.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Alignment isn’t about being on Zoom together. Alignment is when the team can answer, instantly:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>what are we shipping?</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>why does it matter?</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>what does “done” mean?</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>who says yes/no?</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>where is the source of truth?</span></li>
      </ul>

      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        If those answers exist, remote becomes quiet and fast. If they don’t, even the best people drown.
      </p>

      <div class="my-16 border-l-2 border-[#D4FF00] pl-6 md:pl-8">
        <h3 class="font-display text-[#D4FF00] text-3xl md:text-5xl uppercase tracking-tighter leading-[0.9]">
          Balance is predictable load,<br/>not free time.
        </h3>
      </div>

      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        People talk about “work-life balance” like it’s a motivational poster.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        In real life - especially when you’re building something serious and you have a family - balance comes from predictability:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>you know when deep work happens</span></li>
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>you know when coordination happens</span></li>
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>you know when work ships</span></li>
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>you know when you’re off</span></li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Remote without structure is the opposite: everything is always slightly on. That’s not sustainable. And it kills quality.
      </p>
      <p class="font-display text-white text-2xl uppercase tracking-wider my-8">Calm execution is not slower. It’s less chaotic.</p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">The real enemy of remote teams<br/>is open loops</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Open loops are the hidden tax of modern work:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>briefs that don’t define success</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>requests dropped into DMs</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>feedback that’s just a feeling</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>decisions made in private threads</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>files scattered across tools</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>“final” that never becomes final</span></li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        This doesn’t just slow you down. It drains attention. If you want speed without burnout, your job is simple: close loops early, on purpose, every time.
      </p>

      <div class="my-16 bg-neutral-900/50 p-8 md:p-12 border border-white/5 relative overflow-hidden">
        <div class="absolute top-0 right-0 p-4 opacity-10 font-display text-9xl leading-none text-[#D4FF00] pointer-events-none select-none">REMOTE</div>
        <h3 class="relative z-10 font-display text-white text-2xl uppercase tracking-widest mb-8">The remote operating model that actually works</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
            <div class="bg-black/40 p-5 border-l-2 border-[#D4FF00]">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">01. One Intake Path</strong>
                <p class="text-neutral-400 text-sm">Requests don’t arrive everywhere. One entry point. Always.</p>
            </div>
            <div class="bg-black/40 p-5 border-l-2 border-neutral-700 hover:border-[#D4FF00] transition-colors">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">02. A Real Brief Standard</strong>
                <p class="text-neutral-400 text-sm">Not a form. A usable input: goal, audience, constraints, examples, definition of done.</p>
            </div>
            <div class="bg-black/40 p-5 border-l-2 border-neutral-700 hover:border-[#D4FF00] transition-colors">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">03. A Decision Owner</strong>
                <p class="text-neutral-400 text-sm">One person who can approve. If nobody owns the decision, you get infinite feedback.</p>
            </div>
            <div class="bg-black/40 p-5 border-l-2 border-neutral-700 hover:border-[#D4FF00] transition-colors">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">04. Feedback Windows</strong>
                <p class="text-neutral-400 text-sm">Feedback is a scheduled event, not a constant stream. Format + criteria matter.</p>
            </div>
            <div class="bg-black/40 p-5 border-l-2 border-neutral-700 hover:border-[#D4FF00] transition-colors">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">05. A Packaging Standard</strong>
                <p class="text-neutral-400 text-sm">Every delivery looks the same: files, naming, variants, specs - ready to publish.</p>
            </div>
            <div class="bg-black/40 p-5 border-l-2 border-[#D4FF00]">
                <strong class="text-white block text-sm font-display uppercase tracking-wider mb-2">06. A Shipping Cadence</strong>
                <p class="text-neutral-400 text-sm">Weekly rhythm beats heroic bursts. If everything is “ASAP”, nothing is.</p>
            </div>
        </div>
      </div>

      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        That’s the difference between being “busy” and actually shipping.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Responsiveness is not<br/>being online 24/7</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        This is important. Responsiveness is a capability, not a lifestyle.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        For me, responsiveness means:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>clarify the request fast</span></li>
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>remove uncertainty fast</span></li>
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>deliver the next usable step fast</span></li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        You can do that without being available all day - if your workflow is built for it. If your workflow is not built for it, you can be online 12 hours and still be slow.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Quality is not taste.<br/>It’s a standard.</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        In remote setups, quality drifts unless you actively prevent it. The fix isn’t “hire better people”. The fix is standards that travel:
      </p>
       <div class="flex flex-wrap gap-3 mb-10">
          <span class="px-4 py-2 border border-white/10 rounded-full text-sm text-neutral-300">Templates</span>
          <span class="px-4 py-2 border border-white/10 rounded-full text-sm text-neutral-300">Component Libraries</span>
          <span class="px-4 py-2 border border-white/10 rounded-full text-sm text-neutral-300">Checklists</span>
          <span class="px-4 py-2 border border-white/10 rounded-full text-sm text-neutral-300">QA Gates</span>
          <span class="px-4 py-2 border border-white/10 rounded-full text-sm text-neutral-300">Flexible vs Fixed Rules</span>
       </div>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        This is also how work “ages well”. Not by being trendy - by being coherent and maintainable.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">What I do first when I join a remote team</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        I don’t start in Figma. I start with five questions:
      </p>
      <ul class="list-none mb-10 space-y-3 text-neutral-400 text-lg">
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>where do requests enter?</span></li>
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>who decides?</span></li>
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>what does “done” mean?</span></li>
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>what does “publish-ready” look like here?</span></li>
         <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>what cadence can we sustain without stress?</span></li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Once those are answered, everything gets lighter: fewer meetings, fewer revisions, faster approvals, cleaner handoffs, higher consistency.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        And ironically - more creative energy, because you’re not spending it on coordination.
      </p>

      <hr class="my-16 border-white/10" />

      <div class="bg-neutral-900 border border-white/5 p-8 md:p-12 text-center">
         <p class="font-display text-white text-3xl uppercase tracking-widest mb-4">Remote can be calm.</p>
         <p class="font-display text-[#D4FF00] text-4xl md:text-5xl uppercase tracking-tighter leading-none mb-8">But calm is engineered.</p>
         <p class="text-lg text-neutral-400 max-w-2xl mx-auto">
            If you want premium output with fast delivery, stop trying to “manage remote”. Build the operating model that makes quality and speed predictable.
         </p>
      </div>
    `
  },
  {
    id: 1,
    title: "From Agency<br/>to Operating Partner:<br/>The Delivery OS",
    title_pl: "Od Agencji<br/>do Partnera Operacyjnego:<br/>Delivery OS",
    date: "Feb 2026",
    category: "Thought Leadership",
    image: deliveryOSImage,
    content_pl: `
      <p class="mb-6 text-xl leading-relaxed text-neutral-300">
        Większość cyfrowych zespołów nie zawala się dlatego, że brakuje im talentów. <span class="text-white font-medium">Zawala się dlatego, że praca się nie rusza.</span>
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Nie "rusza" w sensie, że ludzie są zajęci. Rusza w sensie: decyzje się zapadają, wnioski stają się jasne, wyjście jest spójne i rzeczy trafiają na rynek bez dramatów. To jest luka między klasyczną agencją a tym, co ja faktycznie robię.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Agencja sprzedaje wykonanie. Partner operacyjny instaluje system dostaw — i potem go używa, aby wysyłać prace wysokiej jakości szybko.
      </p>

      <div class="my-16 border-l-2 border-[#D4FF00] pl-6 md:pl-8">
        <h3 class="font-display text-[#D4FF00] text-3xl md:text-5xl uppercase tracking-tighter leading-[0.9]">
          Rzeczywista wąskie gardło to nie design.<br/>To tarcie przy decyzjach.
        </h3>
      </div>

      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        W nowoczesnych organizacjach design rzadko blokuje postęp. Co blokuje postęp:
      </p>
      <ul class="list-none mb-10 space-y-4 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>niejasne właścicielstwo ("kto decyduje?")</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>niejasne briefy ("poznamy, kiedy zobaczymy")</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>feedback loops bez kryteriów ("możemy spróbować innej wersji?")</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>niespójne standardy ("to wygląda inaczej za każdym razem")</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>słabe handoffy ("wyglądało dobrze w Figmie…")</span></li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Kiedy to jest obecne, zespół rekompensuje poprzez dodanie więcej ludzi, więcej spotkań, więcej narzędzi, więcej wiadomości na Slacku. To nigdy nie rozwiązuje głównego problemu. Rozwiązanie to nie "pracuj ciężej."
      </p>

      <p class="font-display text-white text-2xl uppercase tracking-wider my-8">Rozwiązaniem jest system.</p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Briefy to nie administracja. Briefy to dane wejściowe produktu.</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Brief to nie formalność. To dane wejściowe, które determinują prędkość dostarczenia, jakość wyjścia i wyrównanie.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Słabe dane wejściowe tworzą słabe wyjście — i kosztowne iteracje. Mocne dane wejściowe czynią jakość i prędkość przewidywalne. Dlatego pierwszą rzeczą, którą optymalizuję, są nie wizualizacje. To sposób, w jaki praca wchodzi do systemu.
      </p>

      <div class="my-16 bg-neutral-900/50 p-8 md:p-12 border border-white/5 relative overflow-hidden">
        <div class="absolute top-0 right-0 p-4 opacity-10 font-display text-9xl leading-none text-[#D4FF00] pointer-events-none select-none">OS</div>
        <h3 class="relative z-10 font-display text-white text-2xl uppercase tracking-widest mb-4">Co mam na myśli przez "Delivery OS"</h3>
        <p class="relative z-10 mb-6 text-lg leading-relaxed text-neutral-400">
           Delivery OS to nie oprogramowanie. To model operacyjny — powtarzalny zestaw reguł, który zamienia wnioski w wyjście gotowe do publikacji.
        </p>
        <ol class="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 text-neutral-400 text-lg">
          <li class="bg-black/20 p-4 border border-white/5"><strong class="text-[#D4FF00] block text-xs font-display uppercase tracking-widest mb-1">01. Intake</strong> co wchodzi, jak to wchodzi</li>
          <li class="bg-black/20 p-4 border border-white/5"><strong class="text-[#D4FF00] block text-xs font-display uppercase tracking-widest mb-1">02. Alignment</strong> kto decyduje, jaki jest cel</li>
          <li class="bg-black/20 p-4 border border-white/5"><strong class="text-[#D4FF00] block text-xs font-display uppercase tracking-widest mb-1">03. Execution</strong> design + produkcja</li>
          <li class="bg-black/20 p-4 border border-white/5"><strong class="text-[#D4FF00] block text-xs font-display uppercase tracking-widest mb-1">04. QA</strong> standardy, spójność</li>
          <li class="bg-black/20 p-4 border border-white/5"><strong class="text-[#D4FF00] block text-xs font-display uppercase tracking-widest mb-1">05. Handoff</strong> gotowe do publikacji</li>
          <li class="bg-black/20 p-4 border border-white/5"><strong class="text-[#D4FF00] block text-xs font-display uppercase tracking-widest mb-1">06. Cadence</strong> rytm zamiast chaosu</li>
        </ol>
      </div>

      <div class="my-12">
         <h3 class="font-display text-[#D4FF00] text-2xl md:text-4xl uppercase tracking-tighter leading-tight text-center">
            Najwyższa jakość i szybkie dostarczenie to nie przeciwieństwa — jeśli systematyzujesz wykonanie.
         </h3>
      </div>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Różnica: wyjście vs model operacyjny</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Agencje często pracują tak: weź brief, stwórz opcje, czekaj na feedback, powtarzaj aż ktoś się zmęczy, wyślij. To działa dla projektów jednorazowych. Rozpada się na dużą skalę.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Partner operacyjny pracuje inaczej: uprawnia brief, definiuje właścicielstwo decyzji, buduje szablony wielokrotnego użytku i tworzy przewidywalny rytm wysyłania.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Dlatego czuję się komfortowo sprzedając prędkość. <span class="text-white border-b border-[#D4FF00]/30">Ponieważ to nie "pośpiesz." To zmniejszone tarcie.</span>
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Co się zmienia w epoce AI</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Oczywista historia to: AI robi wykonanie szybciej. Prawda — ale to nie główny punkt. Rzeczywista zmiana polega na tym, że produkcja staje się tańsza, podczas gdy decydowanie pozostaje drogie.
      </p>

      <div class="my-10 pl-6 border-l border-neutral-700">
        <p class="text-xl text-white italic">
          "Bez systemu AI nie tworzy prędkości — tworzy chaos szybciej."
        </p>
      </div>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Poprzeczka jakości to strategia</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Większość zespołów mówi o jakości jako o guście. Traktuję to jako standard. Kiedy jakość jest systematyzowana, przestaje być krucha.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">System to to, co sprawia, że "szybkie" jest spokojne</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Większość ludzi kojarzy prędkość ze stresem. To dlatego, że robią prędkość poprzez pilność. Delivery OS robi coś przeciwnego: wolniej tam, gdzie to ma znaczenie (wyjaśnianie ograniczeń), szybciej tam, gdzie to się opłaca (produkcja).
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        To jedyna prędkość godna sprzedaży.
      </p>

      <hr class="my-16 border-white/10" />

      <div class="bg-[#D4FF00] p-8 md:p-12 text-black">
        <h3 class="font-display text-4xl md:text-6xl uppercase tracking-tighter leading-none mb-6">
          Zacznij od jednego sprintu.<br/>Zainstaluj system.<br/>Potem wysyłaj co tydzień.
        </h3>
        <p class="text-lg font-medium max-w-2xl opacity-80">
          Jeśli budujesz w złożonym środowisku - wiele zespołów, ciągłe wnioski, wysokie standardy - i chcesz najwyższej jakości wyjście przy prędkości bez chaosu, to dokładnie problem, nad którym pracuję.
        </p>
      </div>
`,
    content: `
      <p class="mb-6 text-xl leading-relaxed text-neutral-300">
        Most digital teams don’t fail because they lack talent. <span class="text-white font-medium">They fail because work doesn’t move.</span>
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Not “move” as in people are busy. Move as in: decisions get made, requests become clear, output is consistent, and things ship without drama. That’s the gap between a classic agency and what I actually do.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        An agency sells execution. An operating partner installs a delivery system — and then uses it to ship high-quality work fast.
      </p>

      <div class="my-16 border-l-2 border-[#D4FF00] pl-6 md:pl-8">
        <h3 class="font-display text-[#D4FF00] text-3xl md:text-5xl uppercase tracking-tighter leading-[0.9]">
          The real bottleneck isn’t design.<br/>It’s decision friction.
        </h3>
      </div>

      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        In modern organizations, design rarely blocks progress. What blocks progress is:
      </p>
      <ul class="list-none mb-10 space-y-4 text-neutral-400 text-lg">
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>unclear ownership (“who decides?”)</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>vague briefs (“we’ll know when we see it”)</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>feedback loops without criteria (“can we try another version?”)</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>inconsistent standards (“this looks different every time”)</span></li>
        <li class="flex items-start gap-3"><span class="text-[#D4FF00] mt-1.5 text-xs">●</span> <span>poor handoffs (“it looked good in Figma…”)</span></li>
      </ul>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        When these are present, the team compensates by adding more people, more meetings, more tools, more Slack messages. It never fixes the core issue. The fix is not “work harder.”
      </p>
      
      <p class="font-display text-white text-2xl uppercase tracking-wider my-8">The fix is a system.</p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">Briefs are not admin. Briefs are product inputs.</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        A brief isn’t a formality. It’s the input that determines speed of delivery, quality of output, and alignment.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Weak input creates weak output — and expensive iteration. Strong input makes quality and speed predictable. That’s why the first thing I optimize is not visuals. It’s the way work enters the system.
      </p>

      <div class="my-16 bg-neutral-900/50 p-8 md:p-12 border border-white/5 relative overflow-hidden">
        <div class="absolute top-0 right-0 p-4 opacity-10 font-display text-9xl leading-none text-[#D4FF00] pointer-events-none select-none">OS</div>
        <h3 class="relative z-10 font-display text-white text-2xl uppercase tracking-widest mb-4">What I mean by “Delivery OS”</h3>
        <p class="relative z-10 mb-6 text-lg leading-relaxed text-neutral-400">
           A Delivery OS is not software. It’s an operating model — a repeatable set of rules that turns requests into publish-ready output.
        </p>
        <ol class="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 text-neutral-400 text-lg">
          <li class="bg-black/20 p-4 border border-white/5"><strong class="text-[#D4FF00] block text-xs font-display uppercase tracking-widest mb-1">01. Intake</strong> what enters, how it enters</li>
          <li class="bg-black/20 p-4 border border-white/5"><strong class="text-[#D4FF00] block text-xs font-display uppercase tracking-widest mb-1">02. Alignment</strong> who decides, what’s the goal</li>
          <li class="bg-black/20 p-4 border border-white/5"><strong class="text-[#D4FF00] block text-xs font-display uppercase tracking-widest mb-1">03. Execution</strong> design + production</li>
          <li class="bg-black/20 p-4 border border-white/5"><strong class="text-[#D4FF00] block text-xs font-display uppercase tracking-widest mb-1">04. QA</strong> standards, consistency</li>
          <li class="bg-black/20 p-4 border border-white/5"><strong class="text-[#D4FF00] block text-xs font-display uppercase tracking-widest mb-1">05. Handoff</strong> ready-to-publish</li>
          <li class="bg-black/20 p-4 border border-white/5"><strong class="text-[#D4FF00] block text-xs font-display uppercase tracking-widest mb-1">06. Cadence</strong> rhythm over chaos</li>
        </ol>
      </div>

      <div class="my-12">
         <h3 class="font-display text-[#D4FF00] text-2xl md:text-4xl uppercase tracking-tighter leading-tight text-center">
            Premium quality and fast delivery are not opposites — if you systemize execution.
         </h3>
      </div>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">The difference: output vs operating model</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Agencies often work like this: take a brief, produce options, wait for feedback, repeat until someone gets tired, ship. That works for one-off projects. It collapses under scale.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        An operating partner works differently: makes the brief real, defines decision ownership, builds reusable templates, and creates a predictable shipping cadence.
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        This is why I’m comfortable selling speed. <span class="text-white border-b border-[#D4FF00]/30">Because it’s not “rush.” It’s reduced friction.</span>
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">What changes in the AI era</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        The obvious story is: AI makes execution faster. True — but not the main point. The real shift is that making gets cheaper, while deciding stays expensive.
      </p>
      
      <div class="my-10 pl-6 border-l border-neutral-700">
        <p class="text-xl text-white italic">
          "Without a system, AI doesn’t create speed — it creates chaos faster."
        </p>
      </div>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">The quality bar is a strategy</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Most teams talk about quality as taste. I treat it as a standard. When quality is systemized, it stops being fragile.
      </p>

      <h2 class="text-3xl font-bold text-white mt-16 mb-6">The system is what makes “fast” calm</h2>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        Most people associate speed with stress. That’s because they’re doing speed through urgency. The Delivery OS does the opposite: slower where it matters (clarifying constraints), faster where it pays off (production).
      </p>
      <p class="mb-6 text-lg leading-relaxed text-neutral-400">
        That’s the only kind of speed worth selling.
      </p>

      <hr class="my-16 border-white/10" />
      
      <div class="bg-[#D4FF00] p-8 md:p-12 text-black">
        <h3 class="font-display text-4xl md:text-6xl uppercase tracking-tighter leading-none mb-6">
          Start with one sprint.<br/>Install the system.<br/>Then ship weekly.
        </h3>
        <p class="text-lg font-medium max-w-2xl opacity-80">
          If you’re building in a complex environment - multi-team, constant requests, high standards - and you want premium output at speed without chaos, that’s exactly the problem I work on.
        </p>
      </div>
    `
  }
];
