// Icon Generator - Advanced Features
class IconGenerator {
    constructor() {
        this.selectedImage = null;
        this.selectedPlatforms = ['android'];
        this.generatedIcons = [];
        this.isProcessing = false;

        // Customization options
        this.options = {
            backgroundColor: '#ffffff',
            enableBackground: true,
            padding: 8, // percentage
            applyToSquare: false,
            applyToRound: false,
            applyToAdaptive: false,
            // New options for XML
            xmlPadding: 14, // dp
            enableXmlPadding: true
        };

        // Detailed size configurations (Android only)
        this.iconSizes = {
            android: [
                // Traditional square icons
                { name: 'ic_launcher', size: 48, folder: 'mipmap-mdpi', density: 'mdpi', shape: 'square' },
                { name: 'ic_launcher', size: 72, folder: 'mipmap-hdpi', density: 'hdpi', shape: 'square' },
                { name: 'ic_launcher', size: 96, folder: 'mipmap-xhdpi', density: 'xhdpi', shape: 'square' },
                { name: 'ic_launcher', size: 144, folder: 'mipmap-xxhdpi', density: 'xxhdpi', shape: 'square' },
                { name: 'ic_launcher', size: 192, folder: 'mipmap-xxxhdpi', density: 'xxxhdpi', shape: 'square' },
                // Circular icons (Android 7.1+)
                { name: 'ic_launcher_round', size: 48, folder: 'mipmap-mdpi', density: 'mdpi', shape: 'circle' },
                { name: 'ic_launcher_round', size: 72, folder: 'mipmap-hdpi', density: 'hdpi', shape: 'circle' },
                { name: 'ic_launcher_round', size: 96, folder: 'mipmap-xhdpi', density: 'xhdpi', shape: 'circle' },
                { name: 'ic_launcher_round', size: 144, folder: 'mipmap-xxhdpi', density: 'xxhdpi', shape: 'circle' },
                { name: 'ic_launcher_round', size: 192, folder: 'mipmap-xxxhdpi', density: 'xxxhdpi', shape: 'circle' },
                // Adaptive icons (Android 8.0+)
                { name: 'ic_launcher_foreground', size: 108, folder: 'mipmap-mdpi', density: 'mdpi', type: 'adaptive' },
                { name: 'ic_launcher_foreground', size: 162, folder: 'mipmap-hdpi', density: 'hdpi', type: 'adaptive' },
                { name: 'ic_launcher_foreground', size: 216, folder: 'mipmap-xhdpi', density: 'xhdpi', type: 'adaptive' },
                { name: 'ic_launcher_foreground', size: 324, folder: 'mipmap-xxhdpi', density: 'xxhdpi', type: 'adaptive' },
                { name: 'ic_launcher_foreground', size: 432, folder: 'mipmap-xxxhdpi', density: 'xxxhdpi', type: 'adaptive' }
            ]
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.loadJSZip();
    }

    bindEvents() {
        // File input events
        const fileInput = document.getElementById('fileInput');
        const uploadArea = document.getElementById('uploadArea');
        const uploadBtn = document.getElementById('uploadBtn');

        if (fileInput) {
            fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
        }

        if (uploadArea) {
            // Drag and drop events
            uploadArea.addEventListener('dragover', (e) => this.handleDragOver(e));
            uploadArea.addEventListener('dragleave', (e) => this.handleDragLeave(e));
            uploadArea.addEventListener('drop', (e) => this.handleDrop(e));

            // Click only on area, not on button
            uploadArea.addEventListener('click', (e) => {
                // Prevent double click if clicked on button
                if (e.target.closest('#uploadBtn')) {
                    return;
                }
                fileInput?.click();
            });
        }

        if (uploadBtn) {
            uploadBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent event from bubbling to uploadArea
                fileInput?.click();
            });
        }

        // Platform selection
        document.querySelectorAll('.platform-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.classList.toggle('active');
                this.updateSelectedPlatforms();
            });
        });

        // Generate button
        const generateBtn = document.getElementById('generateBtn');
        if (generateBtn) {
            generateBtn.addEventListener('click', () => this.generateIcons());
        }

        // Download all button
        const downloadAllBtn = document.getElementById('downloadAllBtn');
        if (downloadAllBtn) {
            downloadAllBtn.addEventListener('click', () => this.downloadAll());
        }

        // Options controls
        this.bindOptionsEvents();
    }

    bindOptionsEvents() {
        // Background color picker
        const backgroundColorPicker = document.getElementById('backgroundColorPicker');
        if (backgroundColorPicker) {
            backgroundColorPicker.addEventListener('change', (e) => {
                this.options.backgroundColor = e.target.value;
            });
        }

        // Enable background checkbox
        const enableBackground = document.getElementById('enableBackground');
        if (enableBackground) {
            enableBackground.addEventListener('change', (e) => {
                this.options.enableBackground = e.target.checked;
            });
        }

        // Padding slider
        const paddingSlider = document.getElementById('paddingSlider');
        const paddingValue = document.getElementById('paddingValue');
        if (paddingSlider && paddingValue) {
            paddingSlider.addEventListener('input', (e) => {
                this.options.padding = parseInt(e.target.value);
                paddingValue.textContent = `${this.options.padding}%`;
            });
        }

        // Apply to checkboxes
        const applyToSquare = document.getElementById('applyToSquare');
        const applyToRound = document.getElementById('applyToRound');
        const applyToAdaptive = document.getElementById('applyToAdaptive');

        if (applyToSquare) {
            applyToSquare.addEventListener('change', (e) => {
                this.options.applyToSquare = e.target.checked;
            });
        }

        if (applyToRound) {
            applyToRound.addEventListener('change', (e) => {
                this.options.applyToRound = e.target.checked;
            });
        }

        if (applyToAdaptive) {
            applyToAdaptive.addEventListener('change', (e) => {
                this.options.applyToAdaptive = e.target.checked;
                this.updatePreview();
            });
        }

        // XML Padding controls
        const xmlPaddingSlider = document.getElementById('xmlPaddingSlider');
        const xmlPaddingValue = document.getElementById('xmlPaddingValue');
        const enableXmlPadding = document.getElementById('enableXmlPadding');

        if (xmlPaddingSlider && xmlPaddingValue) {
            xmlPaddingSlider.addEventListener('input', (e) => {
                this.options.xmlPadding = parseInt(e.target.value);
                xmlPaddingValue.textContent = `${this.options.xmlPadding}dp`;
            });
        }

        if (enableXmlPadding) {
            enableXmlPadding.addEventListener('change', (e) => {
                this.options.enableXmlPadding = e.target.checked;

                // Show/hide XML configuration
                const xmlPaddingConfig = document.getElementById('xmlPaddingConfig');
                if (xmlPaddingConfig) {
                    xmlPaddingConfig.style.display = e.target.checked ? 'block' : 'none';
                }
            });
        }

        // Add listeners to update preview
        [backgroundColorPicker, enableBackground, paddingSlider, applyToSquare, applyToRound].forEach(element => {
            if (element) {
                element.addEventListener('change', () => this.updatePreview());
                if (element.type === 'range') {
                    element.addEventListener('input', () => this.updatePreview());
                }
            }
        });
    }

    updateSelectedPlatforms() {
        this.selectedPlatforms = [];
        document.querySelectorAll('.platform-btn.active').forEach(btn => {
            this.selectedPlatforms.push(btn.dataset.platform);
        });
    }

    handleFileSelect(event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            this.loadImage(file);
        } else {
            this.showError('Please select a valid image file.');
        }
    }

    handleDragOver(event) {
        event.preventDefault();
        const uploadArea = document.getElementById('uploadArea');
        uploadArea?.classList.add('dragover');
    }

    handleDragLeave(event) {
        event.preventDefault();
        const uploadArea = document.getElementById('uploadArea');
        uploadArea?.classList.remove('dragover');
    }

    handleDrop(event) {
        event.preventDefault();
        const uploadArea = document.getElementById('uploadArea');
        uploadArea?.classList.remove('dragover');

        const files = event.dataTransfer.files;
        if (files.length > 0 && files[0].type.startsWith('image/')) {
            this.loadImage(files[0]);
        } else {
            this.showError('Please drop a valid image file.');
        }
    }

    loadImage(file) {
        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            this.showError('The file is too large. Please use an image smaller than 10MB.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            this.selectedImage = new Image();
            this.selectedImage.onload = () => {
                this.validateImage();
                this.showPreview(e.target.result);
            };
            this.selectedImage.onerror = () => {
                this.showError('Erro ao carregar a imagem. Tente outro arquivo.');
            };
            this.selectedImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    validateImage() {
        if (!this.selectedImage) return false;

        const minSize = 192; // Minimum recommended size
        const maxSize = 4096; // Maximum supported size

        if (this.selectedImage.width < minSize || this.selectedImage.height < minSize) {
            this.showWarning(`Image too small (${this.selectedImage.width}x${this.selectedImage.height}px). We recommend at least ${minSize}x${minSize}px for best quality.`);
        }

        if (this.selectedImage.width > maxSize || this.selectedImage.height > maxSize) {
            this.showWarning(`Image too large (${this.selectedImage.width}x${this.selectedImage.height}px). It will be resized for better performance.`);
        }

        if (this.selectedImage.width !== this.selectedImage.height) {
            this.showWarning('The image is not square. It will be adjusted to a square format.');
        }

        return true;
    }

    showPreview(imageSrc) {
        const previewSection = document.getElementById('previewSection');
        const previewImage = document.getElementById('previewImage');
        const resultsSection = document.getElementById('resultsSection');

        if (previewImage) {
            previewImage.src = imageSrc;
        }

        if (previewSection) {
            previewSection.style.display = 'block';
        }

        if (resultsSection) {
            resultsSection.style.display = 'none';
        }

        // Clear previous icons
        this.generatedIcons = [];

        // Atualizar preview das opções
        setTimeout(() => this.updatePreview(), 100);
    }

    async generateIcons() {
        if (!this.selectedImage || this.selectedPlatforms.length === 0) {
            this.showError('Please select an image and at least one platform.');
            return;
        }

        if (this.isProcessing) {
            return;
        }

        this.isProcessing = true;
        this.showLoading(true);
        this.generatedIcons = [];

        try {
            let totalIcons = 0;
            let processedIcons = 0;

            // Contar total de ícones a serem gerados
            for (const platform of this.selectedPlatforms) {
                totalIcons += this.iconSizes[platform]?.length || 0;
            }

            // Gerar ícones para cada plataforma selecionada
            for (const platform of this.selectedPlatforms) {
                const sizes = this.iconSizes[platform];
                if (!sizes) continue;

                for (const sizeConfig of sizes) {
                    const iconData = await this.generateIcon(this.selectedImage, sizeConfig, platform);
                    this.generatedIcons.push({
                        ...iconData,
                        platform,
                        config: sizeConfig
                    });

                    processedIcons++;
                    this.updateProgress((processedIcons / totalIcons) * 100);
                }
            }

            this.displayResults();
            this.showSuccess(`${this.generatedIcons.length} icons generated successfully!`);

        } catch (error) {
            console.error('Erro ao gerar ícones:', error);
            this.showError('Error generating icons. Please try again.');
        } finally {
            this.isProcessing = false;
            this.showLoading(false);
        }
    }

    generateIcon(sourceImage, sizeConfig, platform) {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = sizeConfig.size;
            canvas.height = sizeConfig.size;

            // Configurar interpolação para melhor qualidade
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';

            // Verificar se deve aplicar as opções personalizadas
            const shouldApplyOptions = this.shouldApplyOptionsToIcon(sizeConfig);

            // Calcular tamanho e posição com padding
            let drawSize = sizeConfig.size;
            let offset = 0;

            if (shouldApplyOptions && this.options.padding > 0) {
                const paddingPixels = Math.round((sizeConfig.size * this.options.padding) / 100);
                drawSize = sizeConfig.size - (paddingPixels * 2);
                offset = paddingPixels;
            }

            // Para ícones circulares, criar máscara circular primeiro
            if (sizeConfig.shape === 'circle') {
                ctx.save();
                ctx.beginPath();
                ctx.arc(sizeConfig.size / 2, sizeConfig.size / 2, sizeConfig.size / 2, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.clip();

                // Aplicar background circular se habilitado (apenas dentro do círculo)
                if (shouldApplyOptions && this.options.enableBackground) {
                    ctx.fillStyle = this.options.backgroundColor;
                    ctx.beginPath();
                    ctx.arc(sizeConfig.size / 2, sizeConfig.size / 2, sizeConfig.size / 2, 0, Math.PI * 2, true);
                    ctx.fill();
                }
            } else {
                // Para ícones quadrados, aplicar background normal
                if (shouldApplyOptions && this.options.enableBackground) {
                    ctx.fillStyle = this.options.backgroundColor;
                    ctx.fillRect(0, 0, sizeConfig.size, sizeConfig.size);
                }
            }

            // Desenhar a imagem redimensionada
            ctx.drawImage(sourceImage, offset, offset, drawSize, drawSize);

            // Restaurar contexto se foi aplicada máscara circular
            if (sizeConfig.shape === 'circle') {
                ctx.restore();
            }

            // Converter para blob
            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                resolve({
                    name: sizeConfig.name,
                    size: sizeConfig.size,
                    url,
                    blob,
                    canvas
                });
            }, 'image/png', 1.0);
        });
    }

    shouldApplyOptionsToIcon(sizeConfig) {
        // Verificar se deve aplicar as opções baseado no tipo de ícone
        if (sizeConfig.name === 'ic_launcher' && sizeConfig.shape === 'square') {
            return this.options.applyToSquare;
        }
        if (sizeConfig.name === 'ic_launcher_round' && sizeConfig.shape === 'circle') {
            return this.options.applyToRound;
        }
        if (sizeConfig.name === 'ic_launcher_foreground' && sizeConfig.type === 'adaptive') {
            return this.options.applyToAdaptive;
        }
        return false;
    }

    addAdaptiveIconXMLFiles(zip) {
        // Gerar cor de background baseada na cor selecionada
        const backgroundColor = this.options.backgroundColor;

        // Determinar o padding do XML
        const xmlInset = this.options.enableXmlPadding ? `${this.options.xmlPadding}dp` : '0dp';

        // Arquivo drawable/ic_launcher_foreground_inset.xml
        const foregroundInsetXml = `<?xml version="1.0" encoding="utf-8"?>
<inset xmlns:android="http://schemas.android.com/apk/res/android"
    android:drawable="@mipmap/ic_launcher_foreground"
    android:insetLeft="${xmlInset}"
    android:insetTop="${xmlInset}"
    android:insetRight="${xmlInset}"
    android:insetBottom="${xmlInset}"
/>`;

        // Arquivo mipmap-anydpi-v26/ic_launcher.xml
        const icLauncherXml = `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/ic_launcher_background"/>
    <foreground android:drawable="@drawable/ic_launcher_foreground_inset"/>
</adaptive-icon>`;

        // Arquivo mipmap-anydpi-v26/ic_launcher_round.xml
        const icLauncherRoundXml = `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/ic_launcher_background"/>
    <foreground android:drawable="@drawable/ic_launcher_foreground_inset"/>
</adaptive-icon>`;

        // Arquivo values/colors.xml com a cor de background
        const colorsXml = `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="ic_launcher_background">${backgroundColor}</color>
</resources>`;

        // Adicionar arquivos ao ZIP
        zip.file('android/res/drawable/ic_launcher_foreground_inset.xml', foregroundInsetXml);
        zip.file('android/res/mipmap-anydpi-v26/ic_launcher.xml', icLauncherXml);
        zip.file('android/res/mipmap-anydpi-v26/ic_launcher_round.xml', icLauncherRoundXml);
        zip.file('android/res/values/colors.xml', colorsXml);

        // Adicionar arquivo README com instruções
        const readmeContent = `# Ícones Android Gerados

## Estrutura dos Arquivos

### Ícones Bitmap (.png)
- **mipmap-mdpi/**: Densidade 1.0x (48px, 72px, 108px)
- **mipmap-hdpi/**: Densidade 1.5x (72px, 108px, 162px)
- **mipmap-xhdpi/**: Densidade 2.0x (96px, 144px, 216px)
- **mipmap-xxhdpi/**: Densidade 3.0x (144px, 216px, 324px)
- **mipmap-xxxhdpi/**: Densidade 4.0x (192px, 288px, 432px)

### Ícones Adaptativos (Android 8.0+)
- **mipmap-anydpi-v26/**: Definições XML para ícones adaptativos
- **drawable/**: Recursos auxiliares (insets configuráveis)
- **values/colors.xml**: Cor de fundo definida como #${backgroundColor.replace('#', '')}

## Como Usar

1. Copie toda a pasta \`res/\` para \`app/src/main/res/\` no seu projeto Android
2. Os ícones adaptativos funcionarão no Android 8.0+ (API 26+)
3. Dispositivos mais antigos usarão automaticamente os ícones bitmap
4. A cor de background foi definida automaticamente com base na sua seleção
5. O padding XML foi configurado para ${xmlInset} (${this.options.enableXmlPadding ? 'habilitado' : 'desabilitado'})

## Tipos de Ícone Incluídos

- ✅ **ic_launcher**: Ícones quadrados tradicionais
- ✅ **ic_launcher_round**: Ícones circulares (Android 7.1+)  
- ✅ **ic_launcher_foreground**: Camada foreground para ícones adaptativos
- ✅ **Adaptive Icons**: Configuração XML completa para Android 8.0+

Gerado em ${new Date().toLocaleDateString('pt-BR')} pelo Gerador de Ícones Android.`;

        zip.file('android/README.md', readmeContent);
    }

    updatePreview() {
        if (!this.selectedImage) return;

        const previewSection = document.getElementById('optionsPreview');
        if (previewSection) {
            previewSection.style.display = 'block';
        }

        // Preview para cada tipo de ícone
        this.drawPreview('previewSquare', { shape: 'square', name: 'ic_launcher' });
        this.drawPreview('previewRound', { shape: 'circle', name: 'ic_launcher_round' });
        this.drawPreview('previewAdaptive', { type: 'adaptive', name: 'ic_launcher_foreground' });
    }

    drawPreview(canvasId, sizeConfig) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const size = 64;

        ctx.clearRect(0, 0, size, size);

        // Verificar se deve aplicar as opções
        const shouldApply = this.shouldApplyOptionsToIcon(sizeConfig);

        // Calcular tamanho e posição com padding
        let drawSize = size;
        let offset = 0;

        if (shouldApply && this.options.padding > 0) {
            const paddingPixels = Math.round((size * this.options.padding) / 100);
            drawSize = size - (paddingPixels * 2);
            offset = paddingPixels;
        }

        // Para ícones circulares, criar máscara circular primeiro
        if (sizeConfig.shape === 'circle') {
            ctx.save();
            ctx.beginPath();
            ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();

            // Aplicar background circular se habilitado (apenas dentro do círculo)
            if (shouldApply && this.options.enableBackground) {
                ctx.fillStyle = this.options.backgroundColor;
                ctx.beginPath();
                ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2, true);
                ctx.fill();
            }
        } else {
            // Para ícones quadrados, aplicar background normal
            if (shouldApply && this.options.enableBackground) {
                ctx.fillStyle = this.options.backgroundColor;
                ctx.fillRect(0, 0, size, size);
            }
        }

        // Desenhar a imagem
        ctx.drawImage(this.selectedImage, offset, offset, drawSize, drawSize);

        // Restaurar contexto se foi aplicada máscara circular
        if (sizeConfig.shape === 'circle') {
            ctx.restore();
        }
    }

    displayResults() {
        const resultsGrid = document.getElementById('resultsGrid');
        const resultsSection = document.getElementById('resultsSection');

        if (!resultsGrid || !resultsSection) return;

        resultsGrid.innerHTML = '';

        this.generatedIcons.forEach((icon, index) => {
            const iconItem = document.createElement('div');
            iconItem.className = 'icon-item';
            iconItem.setAttribute('data-platform', icon.platform);
            iconItem.style.animationDelay = `${index * 0.05}s`;

            const purpose = icon.config.purpose || icon.config.folder || icon.config.density || '';
            const shape = icon.config.shape ? `(${icon.config.shape === 'circle' ? '⭕ circular' : '⬜ quadrado'})` : '';
            const displaySize = 80; // Tamanho fixo para todos os ícones
            const isCircular = icon.config.shape === 'circle';
            const borderRadius = isCircular ? '50%' : '8px';

            iconItem.innerHTML = `
                <img src="${icon.url}" alt="${icon.name}" 
                     style="width: ${displaySize}px; height: ${displaySize}px; border-radius: ${borderRadius}; object-fit: cover; margin-bottom: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <div class="icon-info" style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <strong style="color: #333; font-size: 0.9em;">${icon.name}</strong><br>
                        <span style="color: #666; font-size: 0.8em;">${icon.size}x${icon.size}px ${shape}</span><br>
                        <small style="color: #888; font-size: 0.75em;">${purpose}</small>
                    </div>
                    <button onclick="iconGenerator.downloadIcon('${icon.name}', ${index})" 
                            style="margin-top: 12px; padding: 8px 16px; border: none; background: #2196F3; color: white; border-radius: 6px; cursor: pointer; font-size: 0.8em; transition: background 0.2s;">
                        💾 Baixar
                    </button>
                </div>
            `;

            resultsGrid.appendChild(iconItem);
        });

        resultsSection.style.display = 'block';
    }

    downloadIcon(iconName, index) {
        const icon = this.generatedIcons[index];
        if (icon) {
            const link = document.createElement('a');
            link.download = `${iconName}.png`;
            link.href = icon.url;
            link.click();
        }
    }

    async downloadAll() {
        if (this.generatedIcons.length === 0) {
            this.showError('No icons have been generated yet.');
            return;
        }

        try {
            this.showLoading(true, 'Preparing download...');

            if (!window.JSZip) {
                await this.loadJSZip();
            }

            const zip = new JSZip();

            // Organizar ícones Android por pasta mipmap
            const platformIcons = this.generatedIcons.filter(icon => icon.platform === 'android');

            for (const icon of platformIcons) {
                const folderPath = `android/res/${icon.config.folder}`;
                zip.file(`${folderPath}/${icon.name}.png`, icon.blob);
            }

            // Adicionar arquivos XML para ícones adaptativos
            this.addAdaptiveIconXMLFiles(zip);

            // Gerar e baixar o ZIP
            const content = await zip.generateAsync({
                type: 'blob',
                compression: 'DEFLATE',
                compressionOptions: { level: 6 }
            });

            const link = document.createElement('a');
            link.download = 'app-icons.zip';
            link.href = URL.createObjectURL(content);
            link.click();

            this.showSuccess('Download started successfully!');

        } catch (error) {
            console.error('Erro no download:', error);
            this.showError('Error preparing download. Please try again.');
        } finally {
            this.showLoading(false);
        }
    }



    async loadJSZip() {
        if (window.JSZip) return window.JSZip;

        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
            script.onload = () => resolve(window.JSZip);
            script.onerror = () => reject(new Error('Failed to load JSZip'));
            document.head.appendChild(script);
        });
    }

    showLoading(show, message = 'Gerando ícones...') {
        const loadingSection = document.getElementById('loadingSection');
        if (loadingSection) {
            loadingSection.style.display = show ? 'block' : 'none';
            const text = loadingSection.querySelector('p');
            if (text) text.textContent = message;
        }
    }

    updateProgress(percentage) {
        // Implement progress bar if needed
        console.log(`Progress: ${Math.round(percentage)}%`);
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showWarning(message) {
        this.showNotification(message, 'warning');
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showNotification(message, type = 'info') {
        // Create custom notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        // Inline styles for notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: 'bold',
            zIndex: '10000',
            maxWidth: '400px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            animation: 'slideIn 0.3s ease-out'
        });

        // Colors based on type
        switch (type) {
            case 'error':
                notification.style.background = '#f44336';
                break;
            case 'warning':
                notification.style.background = '#FF9800';
                break;
            case 'success':
                notification.style.background = '#4CAF50';
                break;
            default:
                notification.style.background = '#2196F3';
        }

        document.body.appendChild(notification);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }
}

// Initialize the generator and notification styles when the page loads
let iconGenerator;
document.addEventListener('DOMContentLoaded', () => {
    iconGenerator = new IconGenerator();
    // Add styles for notifications
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(notificationStyles);
});