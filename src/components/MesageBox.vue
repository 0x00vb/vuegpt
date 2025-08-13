<template>
    <div :class="message.role === 'user' ? 'user-message' : 'assistant-message'">
        <p v-if="message.role === 'user'">{{ message.content }}</p>
        <div v-else v-html="renderedContent" class="markdown-content"></div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { marked } from 'marked'
import hljs from 'highlight.js'

// Configure marked with highlight.js
marked.setOptions({
    highlight: function(code, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(code, { language: lang }).value;
            } catch (err) {
                console.error('Syntax highlighting error:', err);
            }
        }
        return hljs.highlightAuto(code).value;
    },
    breaks: true, // Convert line breaks to <br>
    gfm: true // GitHub Flavored Markdown
});

const props = defineProps({
    message: {
        type: Object,
        required: true
    }
})

// Computed property to render markdown for assistant messages
const renderedContent = computed(() => {
    if (props.message.role === 'assistant') {
        return marked.parse(props.message.content || '');
    }
    return props.message.content || '';
});
</script>

<style scoped>
.user-message {
    background-color: #e4dbc9;
    color: #1e2939;
    border-radius: 10px;
    padding: 10px;
    max-width: 80%;
    align-self: flex-end;
}

.assistant-message {
    background-color: #f1e8d6;
    color: #1e2939;
    border-radius: 10px;
    padding: 10px;
    max-width: 80%;
    align-self: flex-start;
}

/* Markdown styling for assistant messages */
.markdown-content :deep(h1),
.markdown-content :deep(h2),
.markdown-content :deep(h3),
.markdown-content :deep(h4),
.markdown-content :deep(h5),
.markdown-content :deep(h6) {
    margin-top: 1.5em;
    margin-bottom: 0.5em;
    font-weight: 600;
    line-height: 1.25;
}

.markdown-content :deep(h1) { font-size: 1.5em; }
.markdown-content :deep(h2) { font-size: 1.3em; }
.markdown-content :deep(h3) { font-size: 1.1em; }

.markdown-content :deep(p) {
    margin-bottom: 1em;
    line-height: 1.6;
}

.markdown-content :deep(p:last-child) {
    margin-bottom: 0;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
    margin-bottom: 1em;
    padding-left: 1.5em;
}

.markdown-content :deep(li) {
    margin-bottom: 0.25em;
}

.markdown-content :deep(pre) {
    background-color: #2d3748;
    color: #e2e8f0;
    border-radius: 6px;
    padding: 1em;
    margin: 1em 0;
    overflow-x: auto;
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.9em;
}

.markdown-content :deep(code) {
    background-color: #2d3748;
    color: #e2e8f0;
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.9em;
}

.markdown-content :deep(pre code) {
    background-color: transparent;
    padding: 0;
}

.markdown-content :deep(blockquote) {
    border-left: 4px solid #cbd5e0;
    padding-left: 1em;
    margin: 1em 0;
    font-style: italic;
    color: #4a5568;
}

.markdown-content :deep(strong) {
    font-weight: 600;
}

.markdown-content :deep(em) {
    font-style: italic;
}

.markdown-content :deep(a) {
    color: #3182ce;
    text-decoration: underline;
}

.markdown-content :deep(a:hover) {
    color: #2c5282;
}

.markdown-content :deep(table) {
    border-collapse: collapse;
    width: 100%;
    margin: 1em 0;
}

.markdown-content :deep(th),
.markdown-content :deep(td) {
    border: 1px solid #e2e8f0;
    padding: 0.5em;
    text-align: left;
}

.markdown-content :deep(th) {
    background-color: #f7fafc;
    font-weight: 600;
}

.markdown-content :deep(hr) {
    border: none;
    border-top: 1px solid #e2e8f0;
    margin: 2em 0;
}
</style>