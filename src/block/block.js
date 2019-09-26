/** 
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';
import {randomCats, randomCat} from "./cat.js";

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const {  
	Toolbar, 
	ServerSideRender, 
	SelectControl, 
	Button, 
	ButtonGroup, 
	ColorIndicator,
	ColorPicker,
	RangeControl,
} = wp.components;
const { withState } = wp.compose;
const {
    RichText,
    AlignmentToolbar,
    BlockControls,
    BlockAlignmentToolbar,
	InspectorControls,
	ColorPalette
} = wp.editor;


function Cats(props) {
	const {color="green", size=100, tag="jump"} = props;
	return (
		<section class="random-cats" style={{backgroundColor: color, padding: '8px'}}>
			<h4>Random Cats</h4>
			<section>
				{(props.cats || []).map(cat => {
					return (
						<div class="cat" style={{display: 'inline-block', verticalAlign: 'top'}} key={cat.id}>
							<div style={{
								width: size + 'px', 
								height: size + 'px',
								backgroundImage: `url(https://cataas.com/cat/${tag}/says/${cat.name}?size=120)`,
								backgroundRepeat: 'no-repeat',
								backgroundPosition: 'center center',
								backgroundSize: 'contain',
								}} 
								className="cat-pic">
							</div>
							<em className="cat-name">{cat.name}</em>
						</div>
					)
				})}
			</section>
		</section>
	);
}




// https://developer.wordpress.org/block-editor/tutorials/block-tutorial/creating-dynamic-blocks/
/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
// https://developer.wordpress.org/block-editor/developers/block-api/block-registration/
const defaultCats = randomCats();

registerBlockType( 'custom/cats-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Cats' ), // Block title.
	icon: 'smiley', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'cats' ),
		__( 'meow' ),

	],
	// https://developer.wordpress.org/block-editor/developers/block-api/block-attributes/
	attributes: {
		cats: {
			type: 'array',
			default: defaultCats,
			source: 'query',
			selector: '.cat-name',
			query: {
				name: {
					type: 'string',
					source: 'text',
				},
			}
		},
        size: {
			selector: '[data-size]',
			source: 'attribute',
			attribute: 'data-size',
			default: 100,
		},
		tag: {
			selector: '[data-tag]',
			type :'string',
			source: 'attribute',
			attribute: 'data-tag',
			default: 'jump',
		},
		color: {
			selector: '[data-color]',
			type :'string',
			source: 'attribute',
			attribute: 'data-color',
			default: '#e13ed1',
		},
	},
	
	
	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: ( props ) => {
		const controls = [
			{
				icon: 'format-status',
				title: 'Align left',
				align: 'left',
				onClick: () => props.setAttributes( { size: '50%' } ),
			},
		];
		return [
			<InspectorControls> 
				<RangeControl
					label="Size of pictures"
					value={ parseInt(props.attributes.size)  }
					onChange={ ( size ) => { props.setAttributes( { size } ) } } 
					min={ 90 }
					max={ 400 }
				/>
				<ColorPicker
					label="Background Color"
					color={ props.attributes.color  }
					onChangeComplete={ ( change ) => { props.setAttributes( { color: change.hex } ) } } 
					disableAlpha
				/>
				<SelectControl
					label="Tag"
					value={ props.attributes.tag }
					options={ [
						{ label: 'Cute', value: 'cute' },
						{ label: 'Dance', value: 'dance' },
						{ label: 'Jump', value: 'jump' },
						{ label: 'Sleep', value: 'sleep' },
					] }
					onChange={ ( tag ) => { props.setAttributes( { tag } ) } } />
				
				<ButtonGroup>
					<Button isPrimary>Button 1</Button>
					<Button>Button 2</Button>
				</ButtonGroup>			
			</InspectorControls>,
		
			<div className={ props.className}> 
				<Button isDefault onClick={() => { 
					const cats = props.attributes.cats;
					props.setAttributes({ cats: [...cats,  randomCat(cats.length)] })
				}}>Add Cat</Button>
				<Cats cats={props.attributes.cats} 
					size={props.attributes.size}
					tag={props.attributes.tag}
					color={props.attributes.color} />
				{/* Useful for debugging */}
				<pre style={{fontSize: '9px'}}>{JSON.stringify(props.attributes, null, 2)}</pre>
				{/*<BlockControls>
					<Toolbar controls={controls} />
				</BlockControls>*/}
				{/* <ServerSideRender block="custom/cats-block" attributes={ props.attributes }  /> */}
			</div>
		];
	},
	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ( props ) => {
		return (
			<div data-size={props.attributes.size} data-color={props.attributes.color} data-tag={props.attributes.tag}>
				<Cats cats={props.attributes.cats} 
					size={props.attributes.size}
					tag={props.attributes.tag}
					color={props.attributes.color}  />
				</div>
			);
		/*
		return (
			<ServerSideRender block="custom/cats-block" attributes={ props.attributes } />
		);
		*/
	},
} );