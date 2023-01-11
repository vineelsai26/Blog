import Head from 'next/head'
import Footer from '../src/Footer/Footer'
import Navbar from '../src/Navbar/Navbar'
import Image from 'next/image'
import Typewriter from 'typewriter-effect'
import { Kalam } from '@next/font/google'

const kalam = Kalam({
	weight: '400',
	subsets: ['latin'],
})

export default function Home() {
	const projects = [
		{
			name: 'Fedora WSL',
			image: '/images/projects/fedora-wsl.png',
			type: 'Windows',
			description: 'Fedora WSL is a project that aims to bring the Fedora Linux distribution to Windows Subsystem for Linux (WSL).',
			downloadUrl: 'https://www.microsoft.com/store/apps/9NPCP8DRCHSN',
			gitUrl: 'https://github.com/VsTechDev/Fedora-WSL',
			tags: 'cpp,visualstudio,powershell,linux'
		},
	]
	return (
		<div className={`${kalam.className} bg-slate-200`}>
			<Head>
				<title>Vineel Sai</title>
				<meta name="description" content="Portfolio of Vineel Sai" />
				<link rel="icon" href="/logo.png" />
			</Head>

			<div className='absolute w-full'>
				<Navbar showSearch={false} setArticles={null} setLoading={null} />
			</div>

			<div className='min-h-screen'>
				<div className='min-h-screen w-full'>
					<Image src='/background.jpg' alt='Vineel Sai' width={1920} height={1080} className='h-screen' />

					<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
						<Image src='/profile.png' alt='Vineel Sai' width={200} height={200} className='m-auto w-40 rounded-full' />
						<h1 className='text-4xl text-center font-semibold text-orange-600 p-2'>Vineel Sai</h1>
						<span className='text-white text-center text-xl my-1'>
							<Typewriter
								options={{
									strings: ['Software Engineer', 'Full Stack Web Developer', 'Open Source Contributor', 'Blogger', 'Linux Enthusiast'],
									autoStart: true,
									loop: true,
								}}
							/>
						</span>
					</div>
				</div>

				<div id='projects' className='min-h-screen w-full'>
					<div className='w-full'>
						<h1 className='text-4xl text-center font-semibold p-2 m-5'>My Projects</h1>
						{
							projects.map((project, index) => (
								<div key={index} className='bg-white rounded-lg p-10 flex flex-row w-11/12 m-auto'>
									<div className='w-1/2'>
										<h1 className='text-6xl font-semibold text-center m-10'>{project.name}</h1>
										<p className='text-2xl text-center m-2 font-light'>{project.type}</p>
										<p className='text-2xl text-center m-10 font-semibold'>{project.description}</p>
										<Image src={`https://skillicons.dev/icons?i=${project.tags}`} alt={''} width={400} height={100} className='h-14 m-auto' />
										<div className='flex flex-row justify-evenly m-10'>
											<button
												className="w-1/4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
												onClick={() => window.open(project.downloadUrl, '_blank')}
											>
												Download
											</button>
											<button
												className="w-1/4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
												onClick={() => window.open(project.gitUrl, '_blank')}
											>
												View Code
											</button>
											</div>
									</div>
									<div className='w-1/2'>
										<Image src={project.image} alt={project.name} width={1000} height={540} className='rounded-md border-2 border-black' />
									</div>
								</div>
							))
						}
					</div>
				</div>
			</div>

			<Footer />
		</div >
	)
}
