import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, ColorPalette } from '@wordpress/block-editor';
import {
    PanelBody,
    TextControl,
    SelectControl,
    RangeControl,
    Button,
    ButtonGroup,
    ToggleControl,
    __experimentalInputControl as InputControl
} from '@wordpress/components';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
    const {
        buttonText,
        buttonIcon,
        overlayColor,
        overlayOpacity,
        closeButtonPosition,
        animationStyle,
        menuItems,
        buttonStyle,
        buttonBackgroundColor,
        buttonTextColor,
        menuItemSpacing
    } = attributes;

    const blockProps = useBlockProps({
        className: 'advanced-mobile-navigation-editor'
    });

    const addMenuItem = () => {
        const newItems = [...menuItems];
        newItems.push({
            id: Date.now(),
            label: 'New Item',
            url: '#',
            isExternal: false
        });
        setAttributes({ menuItems: newItems });
    };

    const updateMenuItem = (index, field, value) => {
        const newItems = [...menuItems];
        newItems[index] = { ...newItems[index], [field]: value };
        setAttributes({ menuItems: newItems });
    };

    const removeMenuItem = (index) => {
        const newItems = menuItems.filter((_, i) => i !== index);
        setAttributes({ menuItems: newItems });
    };

    const moveMenuItem = (index, direction) => {
        if (
            (direction === 'up' && index === 0) ||
            (direction === 'down' && index === menuItems.length - 1)
        ) {
            return;
        }

        const newItems = [...menuItems];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
        setAttributes({ menuItems: newItems });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Button Settings', 'advanced-mobile-navigation')} initialOpen={true}>
                    <TextControl
                        label={__('Button Text', 'advanced-mobile-navigation')}
                        value={buttonText}
                        onChange={(value) => setAttributes({ buttonText: value })}
                    />
                    
                    <SelectControl
                        label={__('Button Icon', 'advanced-mobile-navigation')}
                        value={buttonIcon}
                        options={[
                            { label: 'Hamburger (☰)', value: 'hamburger' },
                            { label: 'Dots (⋯)', value: 'dots' },
                            { label: 'Grid (⊞)', value: 'grid' },
                            { label: 'None', value: 'none' }
                        ]}
                        onChange={(value) => setAttributes({ buttonIcon: value })}
                    />

                    <SelectControl
                        label={__('Button Style', 'advanced-mobile-navigation')}
                        value={buttonStyle}
                        options={[
                            { label: 'Default', value: 'default' },
                            { label: 'Outline', value: 'outline' },
                            { label: 'Text Only', value: 'text' },
                            { label: 'Rounded', value: 'rounded' }
                        ]}
                        onChange={(value) => setAttributes({ buttonStyle: value })}
                    />

                    <div className="color-control">
                        <p className="components-base-control__label">
                            {__('Button Background Color', 'advanced-mobile-navigation')}
                        </p>
                        <ColorPalette
                            value={buttonBackgroundColor}
                            onChange={(value) => setAttributes({ buttonBackgroundColor: value || '#0073aa' })}
                        />
                    </div>

                    <div className="color-control">
                        <p className="components-base-control__label">
                            {__('Button Text Color', 'advanced-mobile-navigation')}
                        </p>
                        <ColorPalette
                            value={buttonTextColor}
                            onChange={(value) => setAttributes({ buttonTextColor: value || '#ffffff' })}
                        />
                    </div>
                </PanelBody>

                <PanelBody title={__('Overlay Settings', 'advanced-mobile-navigation')} initialOpen={false}>
                    <div className="color-control">
                        <p className="components-base-control__label">
                            {__('Overlay Color', 'advanced-mobile-navigation')}
                        </p>
                        <ColorPalette
                            value={overlayColor}
                            onChange={(value) => setAttributes({ overlayColor: value || '#000000' })}
                        />
                    </div>

                    <RangeControl
                        label={__('Overlay Opacity', 'advanced-mobile-navigation')}
                        value={overlayOpacity}
                        onChange={(value) => setAttributes({ overlayOpacity: value })}
                        min={0}
                        max={1}
                        step={0.05}
                    />

                    <SelectControl
                        label={__('Animation Style', 'advanced-mobile-navigation')}
                        value={animationStyle}
                        options={[
                            { label: 'Fade', value: 'fade' },
                            { label: 'Slide from Top', value: 'slide-top' },
                            { label: 'Slide from Bottom', value: 'slide-bottom' },
                            { label: 'Slide from Left', value: 'slide-left' },
                            { label: 'Slide from Right', value: 'slide-right' },
                            { label: 'Zoom', value: 'zoom' }
                        ]}
                        onChange={(value) => setAttributes({ animationStyle: value })}
                    />

                    <SelectControl
                        label={__('Close Button Position', 'advanced-mobile-navigation')}
                        value={closeButtonPosition}
                        options={[
                            { label: 'Top Right', value: 'top-right' },
                            { label: 'Top Left', value: 'top-left' },
                            { label: 'Top Center', value: 'top-center' }
                        ]}
                        onChange={(value) => setAttributes({ closeButtonPosition: value })}
                    />
                </PanelBody>

                <PanelBody title={__('Menu Items', 'advanced-mobile-navigation')} initialOpen={false}>
                    <RangeControl
                        label={__('Menu Item Spacing', 'advanced-mobile-navigation')}
                        value={menuItemSpacing}
                        onChange={(value) => setAttributes({ menuItemSpacing: value })}
                        min={5}
                        max={50}
                        step={5}
                    />

                    <div className="menu-items-list">
                        {menuItems.map((item, index) => (
                            <div key={item.id} className="menu-item-control">
                                <TextControl
                                    label={__('Label', 'advanced-mobile-navigation')}
                                    value={item.label}
                                    onChange={(value) => updateMenuItem(index, 'label', value)}
                                />
                                <TextControl
                                    label={__('URL', 'advanced-mobile-navigation')}
                                    value={item.url}
                                    onChange={(value) => updateMenuItem(index, 'url', value)}
                                />
                                <ToggleControl
                                    label={__('Open in new tab', 'advanced-mobile-navigation')}
                                    checked={item.isExternal}
                                    onChange={(value) => updateMenuItem(index, 'isExternal', value)}
                                />
                                <ButtonGroup className="menu-item-actions">
                                    <Button
                                        icon="arrow-up-alt2"
                                        onClick={() => moveMenuItem(index, 'up')}
                                        disabled={index === 0}
                                        label={__('Move up', 'advanced-mobile-navigation')}
                                    />
                                    <Button
                                        icon="arrow-down-alt2"
                                        onClick={() => moveMenuItem(index, 'down')}
                                        disabled={index === menuItems.length - 1}
                                        label={__('Move down', 'advanced-mobile-navigation')}
                                    />
                                    <Button
                                        icon="trash"
                                        onClick={() => removeMenuItem(index)}
                                        isDestructive
                                        label={__('Remove', 'advanced-mobile-navigation')}
                                    />
                                </ButtonGroup>
                            </div>
                        ))}
                    </div>

                    <Button
                        variant="secondary"
                        onClick={addMenuItem}
                        className="add-menu-item-button"
                    >
                        {__('+ Add Menu Item', 'advanced-mobile-navigation')}
                    </Button>
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="mobile-nav-preview">
                    <button
                        className={`mobile-nav-button mobile-nav-button--${buttonStyle}`}
                        style={{
                            backgroundColor: buttonStyle !== 'outline' && buttonStyle !== 'text' ? buttonBackgroundColor : 'transparent',
                            color: buttonTextColor,
                            borderColor: buttonStyle === 'outline' ? buttonBackgroundColor : 'transparent'
                        }}
                    >
                        {buttonIcon !== 'none' && (
                            <span className="mobile-nav-icon">
                                {buttonIcon === 'hamburger' && '☰'}
                                {buttonIcon === 'dots' && '⋯'}
                                {buttonIcon === 'grid' && '⊞'}
                            </span>
                        )}
                        {buttonText && <span className="mobile-nav-text">{buttonText}</span>}
                    </button>

                    <div className="mobile-nav-preview-info">
                        <p>{__('Mobile Navigation Button', 'advanced-mobile-navigation')}</p>
                        <p className="preview-note">
                            {__('Configure the fullscreen menu in the sidebar. Preview on frontend →', 'advanced-mobile-navigation')}
                        </p>
                        <div className="menu-preview-list">
                            <strong>{__('Menu Items:', 'advanced-mobile-navigation')}</strong>
                            <ul>
                                {menuItems.map((item) => (
                                    <li key={item.id}>{item.label}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
