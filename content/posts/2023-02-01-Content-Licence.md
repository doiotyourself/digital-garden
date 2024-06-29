---
layout: post
title: "Content Licence"
date: 2023-02-01
alias:
  - "Content-Licence"
tags:
  - licence
  - "public domain"
  - CC0
---

Today I have chosen to dedicate all of the content I create for this blog to the public domain.

To let visitors know, I would like to add the creative commons CC0 logo to the footer of this jekyll website.

## Step 1: Source the logo in SVG format

Here is is:

[![Creative Commons CC0](https://mirrors.creativecommons.org/presskit/icons/pd.svg "Creative Commons CC0")](https://creativecommons.org/about/downloads/)

## Step:2 Convert the SVG to Base64

I used this great tool: [https://base64.guru/converter/encode/image/svg](https://base64.guru/converter/encode/image/svg)

Select the output format: CSS Background Image

## Step 3: Modify Jekyll Now

First, in `_config.yml` we will add `creativecommons` element to the `footer-links` dictionary:

```yaml
  creativecommons: publicdomain/zero/1.0/
```

Then we add the icon.

In `_sass/svg-icons.scss` we will use the parent selector to add `.creativecommons` suffix to `.svg-icon` outer selector:

1. Indent the line
2. Parent selector `&`
3. Paste the output from Step 2. 
4. Change `.base4` to `.creativecommons`
5. Add the following two properties to the element to keep the icon appropriately sized. `background-size: contain;``background-repeat: no-repeat;`

Finally add the icon to the html by adding the following line to the bottom of `_includes/svg-icons.html`.  

```html
{% raw %}{% if site.footer-links.creativecommons %}{% endraw %}<a href="https://creativecommons.org/{% raw %}{{ site.footer-links.creativecommons }}{% endraw %}><i class="svg-icon creativecommons"></i></a>{% raw %}{% endif %}{% endraw %}
```

Thanks and good night.
