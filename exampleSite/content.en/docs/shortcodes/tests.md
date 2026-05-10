---
bookHidden: true
---

{{% columns %}}
- ## Asciinema
  {{< asciinema
  cast="asciinema-627097.cast"
  loop=true
  autoplay=true
  speed=2 >}}

- ## Badge
  {{<badge title="Title" value="Value">}}

- ## Button
  {{<button href="/">}}A Button{{</button>}}

- ## Card
  {{<card href="/docs/shortcodes/cards">}}
  **Markdown**  
  Suspendisse sed congue orci, eu congue metus. Nullam feugiat urna massa.
  {{</card>}}

- ## Details
  {{<details "Title" open>}}
  ## Markdown content
  Lorem markdownum insigne...
  {{</details>}}

- ## Hint
  {{<hint danger>}}
  **Markdown content**  
  Lorem markdownum insigne. Olympo signis Delphis! Retexi Nereius nova develat
  stringit, frustra Saturnius uteroque inter! Oculis non ritibus Telethusa
  {{</hint>}}

- ## Image
  {{<image src="placeholder.svg" alt="A placeholder" title="A placeholder" loading="lazy">}}

- ## KaTeX
  {{<katex display="true">}}
  f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
  {{</katex>}}

- ## Mermaid
  {{<mermaid>}}
  stateDiagram-v2
      State1: The state with a note
      note right of State1
          Important information! You can write
          notes.
      end note
      State1 --> State2
      note left of State2 : This is the note to the left.
  {{</mermaid>}}

- ## Steps
  {{<steps>}}
  1. ## Suspendisse sed congue orci.
     Suspendisse sed congue orci, eu congue metus.

  2. ## Maecenas scelerisque sem.
     Maecenas scelerisque sem a tellus dignissim.

  3. ## Etiam risus purus.
     Etiam risus purus, suscipit a orci quis.

  4. ## Curabitur sed lacinia velit.
     Curabitur sed lacinia velit. Nullam sed ante non quam.
  {{</steps>}}

- ## Tabs
  {{<tabs>}}
  {{<tab "MacOS">}}
  # MacOS

  This is tab **MacOS** content.

  Lorem markdownum insigne. Olympo signis Delphis! Retexi Nereius nova develat
  stringit, frustra Saturnius uteroque inter! Oculis non ritibus Telethusa
  protulit, sed sed aere valvis inhaesuro Pallas animam: qui _quid_, ignes.
  Miseratus fonte Ditis conubia.
  {{</tab>}}
  {{<tab "Linux">}}
  # Linux

  This is tab **Linux** content.

  Lorem markdownum insigne. Olympo signis Delphis! Retexi Nereius nova develat
  stringit, frustra Saturnius uteroque inter! Oculis non ritibus Telethusa
  protulit, sed sed aere valvis inhaesuro Pallas animam: qui _quid_, ignes.
  Miseratus fonte Ditis conubia.
  {{</tab>}}
  {{<tab "Windows">}}
  # Windows

  This is tab **Windows** content.

  Lorem markdownum insigne. Olympo signis Delphis! Retexi Nereius nova develat
  stringit, frustra Saturnius uteroque inter! Oculis non ritibus Telethusa
  protulit, sed sed aere valvis inhaesuro Pallas animam: qui _quid_, ignes.
  Miseratus fonte Ditis conubia.
  {{</tab>}}
  {{</tabs>}}
{{% /columns %}}