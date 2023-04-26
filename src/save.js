/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { RichText, useBlockProps } from "@wordpress/block-editor";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */


export default function save({ attributes }) {
	const { tabs, layout, tabListFontSize, tabContentFontSize } = attributes;

	console.log(attributes);
	const tabsClass = `tabs${layout === "vertical" ? " tabs-vertical" : ""}`;
	const tabListClass = `tabs-list${
		layout === "vertical" ? " tabs-list-vertical" : ""
	}`;

	const tabClass = `tabs-tab tab${
			layout === "vertical" ? " tabs-tab-vertical" : ""
		}`;

	return (
		<div {...useBlockProps.save()} className={tabsClass}>
			<ul className={tabListClass}>
				{tabs.map((tab, index) => (
					<li
						key={index}
						className={tabClass}
						style={{ fontSize: `${tabListFontSize}px` }}
					>
						{tab.title}
					</li>
				))}
			</ul>

			<div className={`tabs-content-wrapper${layout === "vertical" ? " tabs-content-wrapper-vertical" : ""}`}>
				{tabs.map((tab, index) => (
					<div
						key={index}
						className="tabs-content"
						style={{ fontSize: `${tabContentFontSize}px` }}
					>
						<RichText.Content value={tab.content} />
					</div>
				))}
			</div>
		</div>
	);
}
