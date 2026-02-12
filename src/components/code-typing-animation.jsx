"use client"
import React, { useState, useEffect } from 'react'

const CodeTypingAnimation = ({ config, palette }) => {
    const [currentSnippetIndex, setCurrentSnippetIndex] = useState(0)
    const [displayText, setDisplayText] = useState('')
    const [isTyping, setIsTyping] = useState(true)

    useEffect(() => {
        const currentSnippet = config.snippets[currentSnippetIndex]
        let timeout

        if (isTyping) {
            if (displayText.length < currentSnippet.length) {
                timeout = setTimeout(() => {
                    setDisplayText(currentSnippet.slice(0, displayText.length + 1))
                }, config.typingSpeed)
            } else {
                setIsTyping(false)
                timeout = setTimeout(() => {
                    setIsTyping(false) // Trigger fade out or reset
                }, config.pauseDuration)
            }
        } else {
            // Reset logic
            timeout = setTimeout(() => {
                setDisplayText('')
                setIsTyping(true)
                setCurrentSnippetIndex((prev) => (prev + 1) % config.snippets.length)
            }, 1000)
        }

        return () => clearTimeout(timeout)
    }, [displayText, isTyping, currentSnippetIndex, config])

    const highlightCode = (code) => {
        if (!code) return ''

        const syntax = palette.syntax || {}

        const rules = [
            { regex: /(\/\/.*|#.*)/, type: 'comment', color: syntax.comment },
            { regex: /('(.*?)'|"(.*?)"|`(.*?)`)/, type: 'string', color: syntax.string },
            { regex: /\b(const|let|var|function|def|class|return|if|else|while|for|public|private|protected|import|export|from|SELECT|FROM|WHERE|GROUP BY|ORDER BY|DESC|ALTER TABLE|ADD CONSTRAINT|CREATE VIEW|AS)\b/, type: 'keyword', color: syntax.keyword },
            { regex: /\b(\d+)\b/, type: 'number', color: syntax.number },
            { regex: /\b([a-zA-Z_]\w*)(?=\s*\()/, type: 'function', color: syntax.function }
        ]

        const tokens = []
        let currentIndex = 0

        const bigRegex = new RegExp(
            rules.map(r => `(${r.regex.source})`).join('|'),
            'g'
        )

        let match
        while ((match = bigRegex.exec(code)) !== null) {
            if (match.index > currentIndex) {
                tokens.push(<span key={currentIndex}>{code.slice(currentIndex, match.index)}</span>)
            }

            let color = palette.text
            for (let i = 0; i < rules.length; i++) {
                if (match[i + 1] !== undefined) {
                    color = rules[i].color
                    break
                }
            }

            tokens.push(
                <span key={match.index} style={{ color: color }}>
                    {match[0]}
                </span>
            )
            currentIndex = bigRegex.lastIndex
        }

        if (currentIndex < code.length) {
            tokens.push(<span key={currentIndex}>{code.slice(currentIndex)}</span>)
        }

        return tokens
    }

    return (
        <div className="w-full h-full flex items-center justify-center font-mono p-8">
            <div className="w-full max-w-2xl bg-black/40 backdrop-blur-md rounded-lg border border-white/10 overflow-hidden shadow-2xl">
                {/* Window Header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    <span className="ml-2 text-[10px] uppercase tracking-widest opacity-30 select-none">development_example.js</span>
                </div>

                {/* Code Area */}
                <div className="p-6 min-h-[220px] relative overflow-x-auto no-scrollbar">
                    <pre className="text-sm md:text-base leading-relaxed whitespace-pre" style={{ color: palette.text }}>
                        <code>
                            {highlightCode(displayText)}
                            <span className="animate-pulse inline-block w-2 h-4 ml-1 align-middle" style={{ backgroundColor: palette.primary }}></span>
                        </code>
                    </pre>

                    {/* Background glow behind code */}
                    <div className="absolute -inset-4 opacity-5 pointer-events-none rounded-full blur-3xl"
                        style={{ backgroundColor: palette.primary }}></div>
                </div>
            </div>
        </div>
    )
}

export default CodeTypingAnimation
