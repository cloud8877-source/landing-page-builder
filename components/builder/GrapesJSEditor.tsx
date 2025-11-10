'use client';

import { useEffect, useRef } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import gjsPresetWebpage from 'grapesjs-preset-webpage';

interface GrapesJSEditorProps {
  onSave: (html: string, css: string) => void;
  initialHtml?: string;
  initialCss?: string;
}

export default function GrapesJSEditor({ onSave, initialHtml = '', initialCss = '' }: GrapesJSEditorProps) {
  const editorRef = useRef<any>(null);

  useEffect(() => {
    if (editorRef.current) return;

    const editor = grapesjs.init({
      container: '#gjs',
      height: '100vh',
      width: 'auto',
      storageManager: false,
      plugins: [gjsPresetWebpage],
      pluginsOpts: {
        [gjsPresetWebpage as any]: {
          modalImportTitle: 'Import Template',
          modalImportLabel: '<div style="margin-bottom: 10px; font-size: 13px;">Paste here your HTML/CSS and click Import</div>',
          modalImportContent: (editor: any) => {
            return editor.getHtml() + '<style>' + editor.getCss() + '</style>';
          },
        },
      },
      canvas: {
        styles: [
          'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css',
        ],
      },
      blockManager: {
        appendTo: '#blocks',
      },
      styleManager: {
        appendTo: '#styles',
        sectors: [
          {
            name: 'General',
            buildProps: ['float', 'display', 'position', 'top', 'right', 'left', 'bottom'],
          },
          {
            name: 'Dimension',
            open: false,
            buildProps: ['width', 'height', 'max-width', 'min-height', 'margin', 'padding'],
          },
          {
            name: 'Typography',
            open: false,
            buildProps: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'color', 'line-height', 'text-align'],
          },
          {
            name: 'Decorations',
            open: false,
            buildProps: ['background-color', 'border-radius', 'border', 'box-shadow', 'background'],
          },
        ],
      },
      layerManager: {
        appendTo: '#layers',
      },
      traitManager: {
        appendTo: '#traits',
      },
      selectorManager: {
        appendTo: '#selectors',
      },
      panels: {
        defaults: [
          {
            id: 'basic-actions',
            el: '.panel__basic-actions',
            buttons: [
              {
                id: 'visibility',
                active: true,
                className: 'btn-toggle-borders',
                label: '<i class="fa fa-clone"></i>',
                command: 'sw-visibility',
              },
              {
                id: 'export',
                className: 'btn-open-export',
                label: '<i class="fa fa-code"></i>',
                command: 'export-template',
                context: 'export-template',
              },
              {
                id: 'show-json',
                className: 'btn-show-json',
                label: '<i class="fa fa-file-code"></i>',
                context: 'show-json',
                command: 'show-json-command',
              },
            ],
          },
          {
            id: 'panel-devices',
            el: '.panel__devices',
            buttons: [
              {
                id: 'device-desktop',
                label: '<i class="fa fa-desktop"></i>',
                command: 'set-device-desktop',
                active: true,
                togglable: false,
              },
              {
                id: 'device-tablet',
                label: '<i class="fa fa-tablet"></i>',
                command: 'set-device-tablet',
                togglable: false,
              },
              {
                id: 'device-mobile',
                label: '<i class="fa fa-mobile"></i>',
                command: 'set-device-mobile',
                togglable: false,
              },
            ],
          },
        ],
      },
      deviceManager: {
        devices: [
          {
            name: 'Desktop',
            width: '',
          },
          {
            name: 'Tablet',
            width: '768px',
            widthMedia: '992px',
          },
          {
            name: 'Mobile',
            width: '320px',
            widthMedia: '480px',
          },
        ],
      },
    });

    // Add custom blocks for Malaysian property features
    editor.BlockManager.add('property-hero', {
      label: 'Property Hero',
      category: 'Property',
      content: `
        <section class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div class="container mx-auto px-4 text-center">
            <h1 class="text-5xl font-bold mb-4">Luxury Property in KL</h1>
            <p class="text-xl mb-8">Your dream home awaits</p>
            <button class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
              Contact Agent
            </button>
          </div>
        </section>
      `,
    });

    editor.BlockManager.add('property-card', {
      label: 'Property Card',
      category: 'Property',
      content: `
        <div class="bg-white rounded-lg shadow-lg overflow-hidden max-w-sm">
          <img src="https://via.placeholder.com/400x300" alt="Property" class="w-full h-48 object-cover" />
          <div class="p-6">
            <h3 class="text-2xl font-bold mb-2">RM 850,000</h3>
            <p class="text-gray-600 mb-4">Mont Kiara, Kuala Lumpur</p>
            <div class="flex justify-between text-sm text-gray-500">
              <span>3 Bedrooms</span>
              <span>2 Bathrooms</span>
              <span>1,200 sqft</span>
            </div>
          </div>
        </div>
      `,
    });

    editor.BlockManager.add('contact-form', {
      label: 'Contact Form',
      category: 'Forms',
      content: `
        <section class="py-16 bg-gray-50">
          <div class="container mx-auto px-4 max-w-2xl">
            <h2 class="text-3xl font-bold text-center mb-8">Interested? Get In Touch</h2>
            <form class="space-y-4">
              <input type="text" placeholder="Full Name" class="w-full px-4 py-3 rounded-lg border" required />
              <input type="email" placeholder="Email" class="w-full px-4 py-3 rounded-lg border" required />
              <input type="tel" placeholder="Phone Number" class="w-full px-4 py-3 rounded-lg border" required />
              <textarea placeholder="Message" rows="4" class="w-full px-4 py-3 rounded-lg border"></textarea>
              <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
                Send Message
              </button>
            </form>
          </div>
        </section>
      `,
    });

    editor.BlockManager.add('whatsapp-button', {
      label: 'WhatsApp Button',
      category: 'Property',
      content: `
        <a href="https://wa.me/60123456789" target="_blank" class="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 flex items-center justify-center">
          <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </a>
      `,
    });

    // Set initial content if provided
    if (initialHtml || initialCss) {
      editor.setComponents(initialHtml);
      editor.setStyle(initialCss);
    }

    // Commands
    editor.Commands.add('set-device-desktop', {
      run: (editor) => editor.setDevice('Desktop'),
    });
    editor.Commands.add('set-device-tablet', {
      run: (editor) => editor.setDevice('Tablet'),
    });
    editor.Commands.add('set-device-mobile', {
      run: (editor) => editor.setDevice('Mobile'),
    });
    editor.Commands.add('show-json-command', {
      run: (editor) => {
        editor.Modal.setTitle('Components JSON')
          .setContent(`<textarea style="width:100%; height: 250px;">
            ${JSON.stringify(editor.getComponents())}
          </textarea>`)
          .open();
      },
    });

    // Auto-save every 30 seconds
    setInterval(() => {
      const html = editor.getHtml();
      const css = editor.getCss();
      onSave(html || '', css || '');
    }, 30000);

    editorRef.current = editor;

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
      }
    };
  }, []);

  const handleSave = () => {
    if (editorRef.current) {
      const html = editorRef.current.getHtml();
      const css = editorRef.current.getCss();
      onSave(html || '', css || '');
    }
  };

  return (
    <div className="relative h-screen">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      />

      <div className="absolute top-0 right-0 z-10 p-4">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>

      <div className="panel__top">
        <div className="panel__basic-actions"></div>
        <div className="panel__devices"></div>
      </div>

      <div className="editor-row">
        <div className="editor-canvas">
          <div id="gjs"></div>
        </div>

        <div className="panel__right">
          <div className="layers-container">
            <div id="layers"></div>
          </div>
          <div id="styles"></div>
          <div id="traits"></div>
        </div>
      </div>

      <style jsx global>{`
        .panel__top {
          padding: 0;
          width: 100%;
          display: flex;
          position: initial;
          justify-content: space-between;
          border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        }
        .panel__basic-actions {
          position: initial;
        }
        .editor-row {
          display: flex;
          justify-content: flex-start;
          align-items: stretch;
          flex-wrap: nowrap;
          height: calc(100vh - 40px);
        }
        .editor-canvas {
          flex-grow: 1;
        }
        .panel__right {
          flex-basis: 230px;
          position: relative;
          overflow-y: auto;
          border-left: 1px solid rgba(0, 0, 0, 0.2);
        }
        .gjs-block {
          width: auto;
          height: auto;
          min-height: 80px;
        }
      `}</style>
    </div>
  );
}
