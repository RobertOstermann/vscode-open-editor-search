# open-editor-search

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=RobertOstermann.open-editor-search"><img src="https://vsmarketplacebadge.apphb.com/version-short/RobertOstermann.open-editor-search.svg" alt="VS Marketplace Version"></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=RobertOstermann.open-editor-search"><img src="https://vsmarketplacebadge.apphb.com/installs-short/RobertOstermann.open-editor-search.svg" alt="VS Marketplace Installs"></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=RobertOstermann.open-editor-search"><img src="https://vsmarketplacebadge.apphb.com/rating-short/RobertOstermann.open-editor-search.svg" alt="VS Marketplace Rating"></a>
</p>

## Features

Search through open editors with an input search bar.

Use the Command Palette and search for the command **Search Open Editors**

![open-editor-search](images/search.png)

## Setup

You must be running an insiders build of VSCode.  
Package the VSIX and install by running the command `vsce package`

- Install VSCE with `npm install -g vsce`
- [Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [Using Proposed API](https://code.visualstudio.com/api/advanced-topics/using-proposed-api)

Open the command palette and type `Configure Runtime Arguments` to enable proposed apis.

```
"enable-proposed-api": [
		"RobertOstermann.open-editor-search"
	]
```

## Extension Settings

| Name                             | Description                                                                       | Default |
| -------------------------------- | --------------------------------------------------------------------------------- | ------- |
| `open-editor-search.fuzzySearch` | Should the quick pick search use fuzzy search instead of VSCode's default search. | `false` |

## Known Issues

This extension currently cycles through each editor to determine the open editors.  
VSCode does not currently provide an API to determine which editors are open.

## Credits / Links

- [VSCode's Extension Samples](https://github.com/microsoft/vscode-extension-samples/tree/master/decorator-sample)
- [All Contributors](../../contributors)
