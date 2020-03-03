# Tabs

## Single level

Tabs let you organize content by context, for example installation instructions for each supported platform.

```tpl
{{</* tabs "uniqueid" */>}}
{{</* tab "MacOS" */>}} # MacOS Content {{</* /tab */>}}
{{</* tab "Linux" */>}} # Linux Content {{</* /tab */>}}
{{</* tab "Windows" */>}} # Windows Content {{</* /tab */>}}
{{</* /tabs */>}}
```

### Example

{{< tabs "uniqueid" >}}
{{< tab "MacOS" >}}
# MacOS

This is tab **MacOS** content.

Lorem markdownum insigne. Olympo signis Delphis! Retexi Nereius nova develat
stringit, frustra Saturnius uteroque inter! Oculis non ritibus Telethusa
protulit, sed sed aere valvis inhaesuro Pallas animam: qui _quid_, ignes.
Miseratus fonte Ditis conubia.
{{< /tab >}}

{{< tab "Linux" >}}

# Linux

This is tab **Linux** content.

Lorem markdownum insigne. Olympo signis Delphis! Retexi Nereius nova develat
stringit, frustra Saturnius uteroque inter! Oculis non ritibus Telethusa
protulit, sed sed aere valvis inhaesuro Pallas animam: qui _quid_, ignes.
Miseratus fonte Ditis conubia.
{{< /tab >}}

{{< tab "Windows" >}}

# Windows

This is tab **Windows** content.

Lorem markdownum insigne. Olympo signis Delphis! Retexi Nereius nova develat
stringit, frustra Saturnius uteroque inter! Oculis non ritibus Telethusa
protulit, sed sed aere valvis inhaesuro Pallas animam: qui _quid_, ignes.
Miseratus fonte Ditis conubia.
{{< /tab >}}
{{< /tabs >}}


## Multiple levels

You can have multiple levels of tabs. For example, information on countries by continent
Note that you can only have markdown content in the lowest level

```tpl
{{</* tabs "continents" */>}}
{{</* tab "America" */>}}

{{</* tabs "countries_america" */>}}
{{</* tab "Canada" */>}} # Canada {{</* /tab */>}}
{{</* tab "US" */>}} # US {{</* /tab */>}}
{{</* /tabs */>}}

{{</* /tab */>}}

{{</* tab "Europe" */>}}

{{</* tabs "countries_europe" */>}}
{{</* tab "UK" */>}} # UK {{</* /tab */>}}
{{</* tab "France" */>}} # France {{</* /tab */>}}
{{</* /tabs */>}}

{{</* /tab */>}}

{{</* tab "Asia" */>}}

{{</* tabs "countries_asia" */>}}
{{</* tab "China" */>}} # China {{</* /tab */>}}
{{</* tab "Japan" */>}} # Japan {{</* /tab */>}}
{{</* /tabs */>}}

{{</* /tab */>}}
{{</* /tabs */>}}
```

### Example
{{< tabs "continents" >}}
{{< tab "America" >}}

{{< tabs "countries_america" >}}
{{< tab "Canada" >}}
# Canada
{{< /tab >}}
{{< tab "US" >}}
# US
{{< /tab >}}
{{< /tabs >}}

{{< /tab >}}

{{< tab "Europe" >}}

{{< tabs "countries_europe" >}}
{{< tab "UK" >}}
# UK 
{{< /tab >}}
{{< tab "France" >}}
# France 
{{< /tab >}}
{{< /tabs >}}

{{< /tab >}}

{{< tab "Asia" >}}

{{< tabs "countries_asia" >}}
{{< tab "China" >}}
# China
{{< /tab >}}
{{< tab "Japan" >}}
# Japan
{{< /tab >}}
{{< /tabs >}}

{{< /tab >}}
{{< /tabs >}}