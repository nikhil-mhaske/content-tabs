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
	InspectorControls,
	PlainText,
	RichText,
	useBlockProps,
} from "@wordpress/block-editor";
import { useState } from "@wordpress/element";
import {
	ToolbarButton,
	PanelBody,
	RangeControl,
	SelectControl,
} from "@wordpress/components";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

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

	const [activeTabClass, setActiveTabClass] = useState("tab");
	const [activeTab, setActiveTab] = useState(attributes.activeTab || 0);
	const [showRemoveTab, setShowRemoveTab] = useState(false);

	const onChangeTitle = (index, newValue) => {
		const newTabs = [...tabs];
		newTabs[index].title = newValue;
		setAttributes({ tabs: newTabs });
	};

	const onChangeContent = (index, newValue) => {
		const newTabs = [...tabs];
		newTabs[index].content = newValue;
		setAttributes({ tabs: newTabs });
	};

	const onChangeLayout = (newLayout) => {
		setAttributes({ layout: newLayout });
	};

	const onChangeTabListFontSize = (newValue) => {
		setAttributes({ tabListFontSize: newValue });
	};

	const onChangeTabContentFontSize = (newValue) => {
		setAttributes({ tabContentFontSize: newValue });
	};

	//Add New Tab
	const onAddTab = () => {
		const newTabs = [
			...tabs,
			{
				title: "",
				content: "",
				placeholderTitle: "Title",
				placeholderContent: "Content Goes Here...",
			},
		];
		setAttributes({ tabs: newTabs });
	};

	//Remove Tab
	const onRemoveTab = (index) => {
		const newTabs = [...tabs];
		newTabs.splice(index, 1);
		setAttributes({ tabs: newTabs });
	};

	//ClassNames
	const tabsClass = `tabs${layout === "vertical" ? " tabs-vertical" : ""}`;
	const tabListClass = `tabs-list${
		layout === "vertical" ? " tabs-list-vertical" : ""
	}`;

	const getTabClassName = (index) => {
		const tabClass = `tabs-tab${
			layout === "vertical" ? " tabs-tab-vertical" : ""
		}`;
		const onActiveTabClass = `${activeTabClass}${
			index === activeTab ? ` ${activeTabClass}-active` : ""
		}`;
		return `${tabClass} ${onActiveTabClass}`;
	};

	return (
		<>
			<BlockControls>
				<ToolbarButton
					icon="plus"
					label={__("Add Tab", "content-tabs")}
					onClick={onAddTab}
				/>
			</BlockControls>
			<div {...useBlockProps()}>
				<div className={tabsClass}>
					<ul className={tabListClass}>
						{tabs.map((tab, index) => (
							<li
								key={index}
								className={getTabClassName(index)}
								onClick={() => {
									setActiveTab(index);

									setShowRemoveTab(index === activeTab ? !showRemoveTab : true);
								}}
							>
								<PlainText
									value={tab.title}
									onChange={(newValue) => onChangeTitle(index, newValue)}
									placeholder={tab.placeholderTitle}
									style={{ fontSize: `${tabListFontSize}px` }}
									className="plaintext-class"
								/>

								{index === activeTab &&
									showRemoveTab && ( // render remove tab button for active tab if showRemoveTab is true
										<button
											onClick={() => onRemoveTab(index)}
											className="remove-tab-button"
										>
											&times; 
										</button>
									)}
							</li>
						))}
						<li className="add-tab-li">
							<button
								onClick={() => onAddTab(tabs.length)}
								className="add-tab-button"
							>
								Add Tab
							</button>
						</li>
					</ul>

					<div className={`tabs-content-wrapper${layout === "vertical" ? " tabs-content-wrapper-vertical" : ""}`}>
						{tabs.map((tab, index) => (
							<div
								key={index}
								className={`tabs-content${
									index === activeTab ? " tabs-content-active" : ""
								}`}
							>
								<RichText
									value={tab.content}
									onChange={(newValue) => onChangeContent(index, newValue)}
									placeholder={tab.placeholderContent}
									style={{ fontSize: `${tabContentFontSize}px` }}
								/>
								{tabs.length > 1 && (
									<button
										onClick={() => onRemoveTab(index)}
										className="button-destructive"
									>
										Remove Tab
									</button>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
			<InspectorControls>
				<PanelBody title={__("Tabs Settings", "content-tabs")}>
					<SelectControl
						label={__("Tab List Placement", "content-tabs")}
						value={layout}
						options={[
							{
								label: __("Horizontal", "content-tabs"),
								value: "horizontal",
							},
							{ label: __("Vertical", "content-tabs"), value: "vertical" },
						]}
						onChange={onChangeLayout}
					/>

					<RangeControl
						label={__("Tab Title Font Size", "content-tabs")}
						value={tabListFontSize}
						min={10}
						max={36}
						step={1}
						onChange={onChangeTabListFontSize}
					/>

					<RangeControl
						label={__("Tab Content Font Size", "content-tabs")}
						value={tabContentFontSize}
						min={10}
						max={36}
						step={1}
						onChange={onChangeTabContentFontSize}
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);
}
