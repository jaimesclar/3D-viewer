# GLB Customizer

**GLB Customizer** is a web-based 3D model viewer built with Vite, Three.js, and Tailwind CSS. It allows users to upload and visualize `.glb` models in real time, change materials and textures, and apply HDR environments for realistic lighting.

## Features

- 🧩 Upload and view `.glb` / `.gltf` models
- 🎨 Real-time material and texture customization
- 🌄 Support for HDR environments (lighting and reflections)
- ⚙️ Modular architecture for easy maintenance and scalability
- ⚡ Built with Vite for fast development
- 💅 Styled with Tailwind CSS

## Folder Structure

```
/glb-customizer
├── index.html
├── style.css
├── main.js
├── modules/
│   ├── loadModel.js
│   ├── changeMaterial.js
│   ├── setupScene.js
│   └── ...more modules
├── assets/
│   ├── models/
│   ├── hdr/
│   └── textures/
├── vite.config.js
└── package.json
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/glb-customizer.git
cd glb-customizer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

## License

This project is licensed under the MIT License.