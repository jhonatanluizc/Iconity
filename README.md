# 🤖 Android Icon Generator

A complete and professional icon generator for Android applications that automatically creates all required sizes and formats from a single image.

## 🌐 Site Oficial

[Visit the Android Icon Generator website](https://jhonatanluizc.github.io/Iconity)

## 📱 Features

### Supported Platform
- **Android**: All icon formats (square, circular, adaptive)
- **Full Mipmap**: All densities (mdpi, hdpi, xhdpi, xxhdpi, xxxhdpi)
- **XML Files**: Full configuration for adaptive icons

### Functionality
- 📂 Drag & Drop or file selection
- 🎨 Real-time preview with configuration options
- 🌈 Customizable background color
- 📐 Configurable internal padding
- 🛠️ XML configuration for adaptive icons
- 🔄 Automatic generation of 15 icons + XML files
- 📦 Download as ZIP organized by folders
- 📱 Responsive and intuitive interface
- ⚡ 100% browser-based processing

## 🎯 Generated Sizes

### Android (mipmap)
```
Square Icons (ic_launcher):
mipmap-mdpi/     48x48px   (1.0x)
mipmap-hdpi/     72x72px   (1.5x)
mipmap-xhdpi/    96x96px   (2.0x)
mipmap-xxhdpi/   144x144px (3.0x)
mipmap-xxxhdpi/  192x192px (4.0x)

Circular Icons (ic_launcher_round):
mipmap-mdpi/     48x48px   (1.0x) - circular format
mipmap-hdpi/     72x72px   (1.5x) - circular format
mipmap-xhdpi/    96x96px   (2.0x) - circular format
mipmap-xxhdpi/   144x144px (3.0x) - circular format
mipmap-xxxhdpi/  192x192px (4.0x) - circular format

Adaptive Icons (ic_launcher_foreground):
mipmap-mdpi/     108x108px  (foreground layer)
mipmap-hdpi/     162x162px  (foreground layer)
mipmap-xhdpi/    216x216px  (foreground layer)
mipmap-xxhdpi/   324x324px  (foreground layer)
mipmap-xxxhdpi/  432x432px  (foreground layer)
```

## 📄 Included XML Files
```
ic_launcher.xml              - Adaptive icon configuration
ic_launcher_round.xml        - Circular icon configuration
ic_launcher_background.xml   - Configurable background layer
ic_launcher_foreground.xml   - Foreground image layer
```

## 🚀 How to Use

1. **Select Image**
   - Click the upload area or drag an image
   - Supported formats: PNG, JPG, JPEG, GIF, BMP, WEBP
   - Recommended: square image, minimum 512x512px

2. **Configure Options**
   - **Color**: Choose background color for adaptive icons
   - **Padding**: Adjust internal padding (0-40%)
   - **Adaptive Icons**: Configure XML values (0-50%)

3. **Preview**
   - Real-time preview of your settings
   - Icons organized by type (square/circular)

4. **Download**
   - Click "Download All (ZIP)" to get everything organized
   - Folder structure ready for Android Studio

## 📁 ZIP Structure

```
android-icons.zip
├── res/
│   ├── mipmap-mdpi/
│   │   ├── ic_launcher.png
│   │   ├── ic_launcher_round.png
│   │   └── ic_launcher_foreground.png
│   ├── mipmap-hdpi/
│   │   ├── ic_launcher.png
│   │   ├── ic_launcher_round.png
│   │   └── ic_launcher_foreground.png
│   ├── ... (other densities)
│   └── drawable/
│       ├── ic_launcher.xml
│       ├── ic_launcher_round.xml
│       ├── ic_launcher_background.xml
│       └── ic_launcher_foreground.xml
```

## ⚙️ Technical Requirements

- Modern browser with Canvas API support
- JavaScript enabled
- Minimum 2MB RAM available
- Internet connection (for JSZip CDN)

## 🎨 Design Recommendations

### Input Image
- **Format**: PNG with transparency or JPG
- **Size**: Minimum 512x512px, recommended 1024x1024px
- **Ratio**: Square (1:1)
- **Quality**: High resolution for best results

### Icon Design
- ✅ Well-defined outlines
- ✅ Contrasting colors
- ✅ Simple and recognizable design
- ✅ Avoid small text
- ❌ Avoid complex gradients
- ❌ Avoid very small details

## 🔧 Advanced Features

### Adaptive Icons (Android 8.0+)
- Automatic generation of foreground icons
- 33% padding applied automatically
- Compatible with different screen formats

### iOS Configuration
- Contents.json file automatically generated
- Full support for Xcode
- Sizes for iPhone and iPad

### Web Manifest
- manifest.json file for PWA
- Automatic icon configuration
- Ready for installation as app

## 🐛 Troubleshooting

### Image does not load
- Check if it is a valid image format
- Maximum size: 10MB
- Try converting to PNG

### Low quality
- Use a higher resolution image
- Make sure the original image is sharp
- Avoid resizing very small images

### Download does not work
- Check if JavaScript is enabled
- Try a different browser
- Clear browser cache

## 📄 Project Files

- `index.html` - Main interface
- `styles.css` - Styles and animations
- `script.js` - JavaScript functionality
- `README.md` - Documentation

## 🌐 Compatibility

### Supported Browsers
- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

### Devices
- Desktop (Windows, Mac, Linux)
- Tablet
- Mobile (optimized view)

## 📚 Technologies Used

- **HTML5** Canvas API for resizing
- **CSS3** Animations and responsive design  
- **JavaScript ES6+** Modern features
- **JSZip** ZIP file generation
- **FileReader API** File reading

## 📱 Android Icon Types

### Square Icons (ic_launcher)
- Traditional Android format
- Used in older versions
- Standard square format

### Circular Icons (ic_launcher_round)
- Introduced in Android 7.1 (API 25)
- Automatically applies circular mask
- Used in launchers that support round icons
- Pixel Launcher, Nova Launcher, etc.

### Adaptive Icons (ic_launcher_foreground + XML)
- Introduced in Android 8.0 (API 26)
- Foreground layer keeps original ratio
- Allows different formats (circular, square, squircle)
- Background layer configurable via XML (included)
- XML files with customizable colors and insets

## 🎯 Use Cases

1. **Mobile Developers**
   - Quickly create icons for apps
   - Update existing icons
   - Test different designs

2. **Designers**
   - Validate designs in different sizes
   - Generate assets for development
   - Rapid prototyping

3. **Students**
   - Academic projects
   - Learning mobile development
   - Portfolio creation

## 🔄 Future Updates

- [ ] Preset colors and styles
- [ ] Batch processing of multiple images
- [ ] API for build tool integration
- [ ] Support for other input formats (SVG, WebP)
- [ ] Play Store asset generation

## 📞 Support

For questions or issues:
1. Check the troubleshooting section
2. Try an updated browser
3. Make sure JavaScript is enabled

---

**Developed with ❤️ to simplify mobile icon creation**