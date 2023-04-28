import archive from '../../data/archive'
import ProjectCard from '../../src/ProjectCard/ProjectCard'

export const metadata = {
    title: 'Archive of My Portfolios',
    description: 'Archive of Portfolio`s of Vineel Sai',
}

export const runtime = 'edge'

export default function Archive() {
    return (
        <div className='min-h-screen'>
            <div id='projects' className='min-h-screen w-full'>
                <div className='w-full'>
                    <h1 className='m-5 p-2 text-center text-4xl font-semibold'>
                        My Projects
                    </h1>
                    <div
                        className='flex w-full flex-wrap items-center justify-center'
                        style={{ margin: 0, width: '100%' }}
                    >
                        {
                            archive.map((project, index) => {
                                return (
                                    <ProjectCard
                                        key={index}
                                        project={project}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
