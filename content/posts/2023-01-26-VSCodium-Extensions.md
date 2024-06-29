---
layout: post
title: "VSCodium Extensions"
date: 2023-01-26
alias:
  - "VSCodium-Extensions"
tags:
  - VSCodium
  - markdown
---

A short post today to talk about a few VSCodium Extensions that increase my productivity.

1. yzhang.markdown-all-in-one
2. mushan.vscode-paste-image
3. ban.spellright
4. DavidAnson.vscode-markdownlint

## Markdown All in One

All you need for Markdown (keyboard shortcuts, table of contents, auto preview and more).

Set it to the default markdown formatter my user. (Config saved in `~/.config/VSCodium/User/settings.json`.)

```json
{
    "[markdown]": {
        "editor.defaultFormatter": "yzhang.markdown-all-in-one"
    }
}
```

## Paste Image

Paste image directly from clipboard to markdown.

Needs xclip which can be installed through Muon package manager.

*Keyboard shortcut `Ctrl+Alt+v`*

Set it up to paste the images in the correct directory and prompt for file name input. (Config for the workspace saved in `.vscode/settings.json`.)

```json
{
    "pasteImage.basePath": "${currentFileDir}",
    "pasteImage.namePrefix": "doiotyourself.com_${currentFileNameWithoutExt}_",
    "pasteImage.path": "${projectRoot}/images",
    "pasteImage.forceUnixStyleSeparator": true,
    "pasteImage.prefix": "/",
    "pasteImage.filePathConfirmInputBoxMode": "onlyName",
    "pasteImage.showFilePathConfirmInputBox": true
}
```

Test image:
![Image by <a href="https://pixabay.com/users/geralt-9301/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1927697">Gerd Altmann</a> from <a href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1927697">Pixabay</a>](/../images/doiotyourself.com_2023-01-26-VSCodium-Extensions_IoT_hand.png)

## Spell Right

Multilingual, Offline and Lightweight Spellchecker

Link Spell Right to my system dictionaries.

```console
$ ln -s /usr/share/hunspell/* ~/.config/VSCodium/Dictionaries
```
Select dictionary with Codium command `SpellRight: Select Dictionary (Language)`

Also, create a keybinding for `SpellRight: Add Selection to User Dictionary`

## markdownlint

markdownlint includes a library of rules to encourage standards and consistency for Markdown files.

To disable specific rules I add `.markdownlint.json` file to root of project directory containing our configuration:

```json
{
    "MD013": false,
    "MD041": false
}
```
