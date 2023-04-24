/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { useState } from "@wordpress/element";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save(props) {

	const {attributes} = props;
	const { tabs, layout, tabListFontSize, tabContentFontSize } = attributes;

	console.log(props);
	//ClassNames
	const tabListClass = `tabs-list${
		layout === "vertical" ? " tabs-list-vertical" : ""
	}`;
	const tabClass = `tabs-tab${
		layout === "vertical" ? "tabs-tab-vertical" : ""
	}`;
	
	//const [activeTab, setActiveTab] = useState(0);
	var activeTab=0; //just because above not working

	return (
		<div { ...useBlockProps.save() }>
			<div className='tabs'>
				<ul className={tabListClass}>
					{tabs.map((tab,index)=> (
						<li key={index}
						className={tabClass}
						onClick={() => {
							console.log("Clicked tab", index);
							setActiveTab(index);
						}}>
							<span>
								{tab.title}
							</span>
						</li>
					))}
				</ul>

				<div className='tabs-content-wrapper'>
					{tabs.map((tab,index)=>(
						<div key={index}
						className={`tabs-content${index === activeTab ? " tabs-content-active": ""}`}>
							<RichText.Content value={tab.content}/>
							</div>
					))}
				</div>


			</div>
		</div>
	);
}
