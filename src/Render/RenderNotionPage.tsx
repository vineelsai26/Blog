"use client"

import { NotionRenderer } from 'react-notion-x'
import { ExtendedRecordMap } from 'notion-types'
import { useEffect, useState } from 'react'


export default function RenderNotionPage({ article }: { article: ExtendedRecordMap }) {
    const [darkTheme, setDarkTheme] = useState(true)

    useEffect(() => {
        const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)")
        setDarkTheme(darkThemeMq.matches)
    }, [])
    return (
        <div>
            {
                article && (
                    <NotionRenderer
                        recordMap={article!}
                        fullPage={true}
                        darkMode={darkTheme}
                        disableHeader={true}
                        showTableOfContents={true}
                        defaultPageIcon=''
                    />
                )
            }
        </div>
    )
} 