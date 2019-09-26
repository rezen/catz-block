# Guten tag to Gutenberg
## Takeway
- How to get started making a block
- React is needed
- If you don't wanna mess with JavaScript check out ACF
  - https://www.advancedcustomfields.com/blog/acf-5-8-introducing-acf-blocks-for-gutenberg/

## Intro
- Call to learn JavaScript deeply
  - https://wesbos.com/learn-javascript/
- What is gutenberg
  - R-evolution in the editor experience
  - Blocked based
  - Getting the editing experience to more closely align front-end result

## Learn JavaScript deeply
  - React
    - https://twitter.com/chrisachard/status/1175022111758442497
    - https://reactjs.org/community/courses.html
    - https://learn.freecodecamp.org/front-end-libraries/react/

### Everything is broken into components
- https://github.com/WordPress/gutenberg/tree/master/packages/components/src
- https://github.com/WordPress/gutenberg/blob/master/packages/components/src/select-control/index.js

```sh
npm install @wordpress/components --save
```

Components are classes or functions that return JSX which is special language Facebook developed to make it easy to write your HTML.

```jsx
function PluginControls(props) {
	return (
		<div class="plugin-controls-panel-1">
      		<ColorIndicator colorValue="#f00" />
            <SelectControl
            	help="What size do you want the text?"
                  label="Size"
                  value={ props.size }
                  options={ [
                      { label: 'Big', value: '100%' },
                      { label: 'Medium', value: '50%' },
                      { label: 'Small', value: '25%' },
                  ] }
            	 />	
		</div>
	);
}

<PluginControls size="50%" />
```

## Creating your own block

- https://developer.wordpress.org/block-editor/tutorials/block-tutorial/
- https://css-tricks.com/learning-gutenberg-1-series-intro/
- https://developer.wordpress.org/block-editor/components/
- https://medium.com/@eudestwt/how-to-make-an-editable-wordpress-gutenberg-block-with-inspector-controls-on-the-sidebar-8779f4eddf8e

A bit part of creating blocks is using the JavaScript API. You can write plain JS, but that quickly becomes cumbersome, which is why JSX came about. Setting up the build steps for modern JS is a pain and you can quickly spend days figuring out how to setup the build chain. Lucky for us there is a tool that makes it easy to scaffold out the foundation for our project!

### create-guten-block
The `create-guten-block` project is a cli tool that quickly helps you get running creating a "base plugin" and setting up the build chains.

- https://github.com/ahmadawais/create-guten-block


```sh
# Install package
npm install -g create-guten-block

# Go to your plugins directory
cd wp-content/plugins

# Create a plugin for the example-block
create-guten-block cats-block

# Open the plugin in your editor
cd cats-block
code .
npm start
```

### Dissecting the pieces
Let's look at the pieces of code and see what they do.

**Backend**  
- `src/init.php`
  - `wp_register_script` Register script to be used by gutenberg
  - `register_block_type` Define a block type on backend

**Frontend**  
- `src/block/block.js`
  - `import` Used to import packages or components
  -  `registerBlockType` Register block on front end
     -  `@edit` Controls editor for block
     -  `@save` Controls what HTML is output from editor 
- `src/*.scss`

### Making cats-block
Now that we've talked about the building blocks of guten berg let's try to make one. There is nice site https://cataas.com/#/ that generates random cat pictures. Let's have a block that generates 6 random cat names with pictures. We'll add controls to resize the pictures.

...