import { registerBlockType } from '@wordpress/blocks';
import { 
    InspectorControls, 
    useBlockProps
} from '@wordpress/block-editor';
import {
    PanelBody,
    TextControl,
    Button,
    RangeControl,
    ColorPicker,
    SelectControl,
    ToggleControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './editor.css';

registerBlockType('advanced-navigation-block/navigation', {
    edit: function Edit({ attributes, setAttributes }) {
        const blockProps = useBlockProps({
            className: 'anb-navigation-block-editor',
        });

        const {
            menuItems = [],
            buttonLabel = 'Menu',
            buttonPosition = 'right',
            menuAlignment = 'left',
            overlayColor = '#000000',
            overlayOpacity = 0.9,
            menuBgColor = '#ffffff',
            menuTextColor = '#000000',
            closeButtonColor = '#000000',
            blockId = '',
        } = attributes;

        // Generate unique block ID if not set
        const uniqueId = blockId || 'anb-' + Math.random().toString(36).substr(2, 9);
        if (!blockId) {
            setAttributes({ blockId: uniqueId });
        }

        const addMenuItem = () => {
            const newItems = [...menuItems, {
                id: Date.now(),
                label: __('New Menu Item', 'advanced-navigation-block'),
                url: '#',
                opensInNewTab: false,
            }];
            setAttributes({ menuItems: newItems });
        };

        const updateMenuItem = (id, field, value) => {
            const newItems = menuItems.map(item => {
                if (item.id === id) {
                    return { ...item, [field]: value };
                }
                return item;
            });
            setAttributes({ menuItems: newItems });
        };

        const removeMenuItem = (id) => {
            const newItems = menuItems.filter(item => item.id !== id);
            setAttributes({ menuItems: newItems });
        };

        const moveMenuItem = (index, direction) => {
            const newItems = [...menuItems];
            const newIndex = direction === 'up' ? index - 1 : index + 1;
            if (newIndex >= 0 && newIndex < newItems.length) {
                [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]];
                setAttributes({ menuItems: newItems });
            }
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Menu Button', 'advanced-navigation-block')} initialOpen={true}>
                        <TextControl
                            label={__('Button Label', 'advanced-navigation-block')}
                            value={buttonLabel}
                            onChange={(value) => setAttributes({ buttonLabel: value })}
                        />
                        <SelectControl
                            label={__('Button Position', 'advanced-navigation-block')}
                            value={buttonPosition}
                            options={[
                                { label: __('Left', 'advanced-navigation-block'), value: 'left' },
                                { label: __('Center', 'advanced-navigation-block'), value: 'center' },
                                { label: __('Right', 'advanced-navigation-block'), value: 'right' },
                            ]}
                            onChange={(value) => setAttributes({ buttonPosition: value })}
                        />
                    </PanelBody>

                    <PanelBody title={__('Menu Items', 'advanced-navigation-block')} initialOpen={true}>
                        <Button
                            isPrimary
                            onClick={addMenuItem}
                            style={{ marginBottom: '16px', width: '100%' }}
                        >
                            {__('Add Menu Item', 'advanced-navigation-block')}
                        </Button>

                        {menuItems.map((item, index) => (
                            <div key={item.id} style={{
                                border: '1px solid #ddd',
                                padding: '12px',
                                marginBottom: '12px',
                                borderRadius: '4px',
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <strong>{item.label || __('Menu Item', 'advanced-navigation-block')}</strong>
                                    <div>
                                        {index > 0 && (
                                            <Button
                                                isSmall
                                                onClick={() => moveMenuItem(index, 'up')}
                                                style={{ marginRight: '4px' }}
                                            >
                                                ↑
                                            </Button>
                                        )}
                                        {index < menuItems.length - 1 && (
                                            <Button
                                                isSmall
                                                onClick={() => moveMenuItem(index, 'down')}
                                                style={{ marginRight: '4px' }}
                                            >
                                                ↓
                                            </Button>
                                        )}
                                        <Button
                                            isDestructive
                                            isSmall
                                            onClick={() => removeMenuItem(item.id)}
                                        >
                                            {__('Remove', 'advanced-navigation-block')}
                                        </Button>
                                    </div>
                                </div>
                                <TextControl
                                    label={__('Label', 'advanced-navigation-block')}
                                    value={item.label}
                                    onChange={(value) => updateMenuItem(item.id, 'label', value)}
                                />
                                <TextControl
                                    label={__('URL', 'advanced-navigation-block')}
                                    value={item.url}
                                    onChange={(value) => updateMenuItem(item.id, 'url', value)}
                                    type="url"
                                />
                                <ToggleControl
                                    label={__('Open in New Tab', 'advanced-navigation-block')}
                                    checked={item.opensInNewTab}
                                    onChange={(value) => updateMenuItem(item.id, 'opensInNewTab', value)}
                                />
                            </div>
                        ))}

                        {menuItems.length === 0 && (
                            <p style={{ color: '#666', fontStyle: 'italic' }}>
                                {__('No menu items. Click "Add Menu Item" to get started.', 'advanced-navigation-block')}
                            </p>
                        )}
                    </PanelBody>

                    <PanelBody title={__('Menu Layout', 'advanced-navigation-block')} initialOpen={false}>
                        <SelectControl
                            label={__('Menu Alignment', 'advanced-navigation-block')}
                            value={menuAlignment}
                            options={[
                                { label: __('Left', 'advanced-navigation-block'), value: 'left' },
                                { label: __('Center', 'advanced-navigation-block'), value: 'center' },
                                { label: __('Right', 'advanced-navigation-block'), value: 'right' },
                            ]}
                            onChange={(value) => setAttributes({ menuAlignment: value })}
                        />
                    </PanelBody>

                    <PanelBody title={__('Overlay Settings', 'advanced-navigation-block')} initialOpen={false}>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '8px' }}>
                                {__('Overlay Color', 'advanced-navigation-block')}
                            </label>
                            <ColorPicker
                                color={overlayColor}
                                onChangeComplete={(color) => setAttributes({ overlayColor: color.hex })}
                            />
                        </div>
                        <RangeControl
                            label={__('Overlay Opacity', 'advanced-navigation-block')}
                            value={overlayOpacity}
                            onChange={(value) => setAttributes({ overlayOpacity: value })}
                            min={0}
                            max={1}
                            step={0.1}
                        />
                    </PanelBody>

                    <PanelBody title={__('Menu Colors', 'advanced-navigation-block')} initialOpen={false}>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '8px' }}>
                                {__('Menu Background Color', 'advanced-navigation-block')}
                            </label>
                            <ColorPicker
                                color={menuBgColor}
                                onChangeComplete={(color) => setAttributes({ menuBgColor: color.hex })}
                            />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '8px' }}>
                                {__('Menu Text Color', 'advanced-navigation-block')}
                            </label>
                            <ColorPicker
                                color={menuTextColor}
                                onChangeComplete={(color) => setAttributes({ menuTextColor: color.hex })}
                            />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '8px' }}>
                                {__('Close Button Color', 'advanced-navigation-block')}
                            </label>
                            <ColorPicker
                                color={closeButtonColor}
                                onChangeComplete={(color) => setAttributes({ closeButtonColor: color.hex })}
                            />
                        </div>
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps}>
                    <div className="anb-editor-preview">
                        <div className="anb-editor-button-preview">
                            <button 
                                className="anb-menu-toggle-preview"
                                style={{
                                    float: buttonPosition === 'left' ? 'left' : buttonPosition === 'right' ? 'right' : 'none',
                                    margin: buttonPosition === 'center' ? '0 auto' : '0',
                                    display: buttonPosition === 'center' ? 'block' : 'inline-block',
                                }}
                            >
                                <span>{buttonLabel}</span>
                                <span className="anb-menu-toggle-icon">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>
                            </button>
                        </div>
                        <div className="anb-editor-menu-preview">
                            <p style={{ margin: '16px 0', color: '#666' }}>
                                <strong>{__('Mobile Fullscreen Menu', 'advanced-navigation-block')}</strong>
                            </p>
                            {menuItems.length > 0 ? (
                                <ul style={{
                                    listStyle: 'none',
                                    padding: 0,
                                    textAlign: menuAlignment,
                                }}>
                                    {menuItems.map((item) => (
                                        <li key={item.id} style={{ marginBottom: '8px' }}>
                                            <a href={item.url} style={{ color: menuTextColor }}>
                                                {item.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p style={{ color: '#999', fontStyle: 'italic' }}>
                                    {__('Add menu items using the sidebar controls.', 'advanced-navigation-block')}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    },
    save: function Save() {
        // This block uses server-side rendering
        return null;
    },
});
