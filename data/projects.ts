const projects = [
	{
		name: 'Fedora WSL',
		image: '/images/projects/fedora-wsl.png',
		description:
			'Fedora WSL is a project that aims to bring the Fedora Linux distribution to Windows Subsystem for Linux (WSL).',
		downloadUrl: 'https://www.microsoft.com/store/apps/9NPCP8DRCHSN',
		gitUrl: 'https://github.com/VsTechDev/Fedora-WSL',
		tags: 'cpp,visualstudio,powershell,linux',
	},
	{
		name: 'Arch WSL',
		image: '/images/projects/arch-wsl.png',
		description:
			'Arch WSL is a project that aims to bring the Arch Linux distribution to Windows Subsystem for Linux (WSL).',
		downloadUrl: 'https://www.microsoft.com/store/apps/9MZNMNKSM73X',
		gitUrl: 'https://github.com/VsTechDev/Arch-WSL',
		tags: 'cpp,visualstudio,powershell,linux',
	},
	{
		name: 'RCE',
		image: '/images/projects/rce.webp',
		description:
			'Remote Code Execution API written in GO. That runs code in a docker container and returns the output.',
		downloadUrl: 'https://github.com/vineelsai26/RCE/releases',
		gitUrl: 'https://github.com/vineelsai26/RCE',
		tags: 'go,docker',
	},
	{
		name: 'Portfolio',
		image: '/images/projects/portfolio.png',
		description:
			'My personal portfolio website and personal Blog. Built with Next.js, Typescript and Tailwind CSS.',
		previewUrl: 'https://blog.vineelsai.com',
		gitUrl: 'https://github.com/vineelsai26/Blog',
		tags: 'ts,react,next,tailwind,mongo',
	},
	{
		name: 'Material Icons',
		image: '/images/projects/material.png',
		description:
			'Material Icons API written in Javascript using Cloudflare Functions.',
		gitUrl: 'https://github.com/vineelsai26/Material-Icons',
		tags: 'js,cloudflare,svg',
	},
	{
		name: 'Water Body Analysis',
		image: '/images/projects/water-body-analysis.png',
		description:
			'Detection and classification of different water bodies using Landsat-8 satellite images.',
		gitUrl: 'https://github.com/vineelsai26/Water-Body-Analysis',
		tags: 'py,tensorflow',
	},
	{
		name: 'Collab',
		image: '/images/projects/collab.png',
		description:
			'Document collaboration online with real-time editing. Just sign in with your Google account and start collaborating.',
		previewUrl: 'https://collab.vineelsai.com',
		gitUrl: 'https://github.com/vineelsai26/Collab',
		tags: 'js,react,vite,express',
	},
	{
		name: 'Paint',
		image: '/images/projects/paint.png',
		description:
			'An Android app built with kotlin to draw something on a canvas and save them as images.',
		downloadUrl:
			'https://play.google.com/store/apps/details?id=com.vs.paint',
		gitUrl: 'https://github.com/VsTechDev/Paint',
		tags: 'kotlin,androidstudio',
	},
	{
		name: 'Algo',
		image: '/images/projects/algo.png',
		description: 'Algorithm Visualization website built with React.',
		previewUrl: 'https://algo.vineelsai.com',
		gitUrl: 'https://github.com/vineelsai26/Algo',
		tags: 'js,react,vite',
	},
]

export default projects
