/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	BlockControls,
	PlainText,
	RichText,
	useBlockProps,
} from "@wordpress/block-editor";
import { useState } from "@wordpress/element";
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";
import { ToolbarButton } from "@wordpress/components";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit(props) {
	const { attributes, setAttributes } = props;
	const { tabs, layout, tabListFontSize, tabContentFontSize } = attributes;

	const onChangeTitle = (index, newValue) => {
		const newTabs = [...tabs];
		newTabs[index].title = newValue;
		setAttributes({ tabs: newTabs });
	};

	const onChangeContent = ( index, newValue) => {
		const newTabs = [...tabs];
		newTabs[index].content = newValue;
		setAttributes({ tabs: newTabs });
	};

	//ClassNames
	const tabListClass = `tabs-list${
		layout === "vertical" ? " tabs-list-vertical" : ""
	}`;
	const tabClass = `tabs-tab${
		layout === "vertical" ? "tabs-tab-vertical" : ""
	}`;
	const [activeTab, setActiveTab] = useState(attributes.activeTab || 0);

	return (
		<>
			<BlockControls>
				<ToolbarButton icon="plus" label={__("Add Tab", "content-tabs")} />
			</BlockControls>
			<div {...useBlockProps()}>
				<div className="tabs">
					<ul className={tabListClass}>
						{tabs.map((tab, index) => (
							<li
								key={index}
								className={tabClass}
								onClick={() => setActiveTab(index)}
							>
								<PlainText
									value={tab.title}
									onChange={(newValue) => onChangeTitle(index,newValue)}
								/>
							</li>
						))}
					</ul>

					<div className="tabs-content-wrapper">
						{tabs.map((tab, index) => (
							<div
								key={index}
								className={`tabs-content${index === activeTab ? " tabs-content-active": ""}`}
							>
								<RichText
									value={tab.content}
									onChange={(newValue) => onChangeContent(index, newValue)}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
