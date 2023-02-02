import sdk from '@stackblitz/sdk';
import { getVueApp } from './templates';

const useCodeSandbox = (language, code, service, extPages) => {
    const getSandboxParameters = (sourceType) => {
        const { files, dependencies, sourceFileName } = getVueApp({ code, service, extPages }, sourceType);

        files['sandbox.config.json'] = {
            content: {
                infiniteLoopProtection: false
            }
        };

        return { files, dependencies, sourceFileName };
    };

    const sandboxParameters = getSandboxParameters(language);

    fetch('https://codesandbox.io/api/v1/sandboxes/define?json=1', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(sandboxParameters)
    })
        .then((response) => response.json())
        .then((data) => window.open(`https://codesandbox.io/s/${data.sandbox_id}`, '_blank'));
};

const useStackBlitz = (language, code, service, extPages) => {
    const getStackBlitzParameters = (sourceType) => {
        const { files, dependencies, sourceFileName } = getVueApp({ code, service, extPages }, sourceType);

        return { files, dependencies, sourceFileName };
    };

    const stackBlitzParameters = getStackBlitzParameters(language);

    let files = {};

    Object.entries(stackBlitzParameters.files).forEach(([k, v]) => (files[`${k}`] = typeof v.content === 'object' ? JSON.stringify(v.content, null, 2) : v.content));

    sdk.openProject(
        {
            title: 'PrimeVue Demo',
            template: 'node',
            description:
                '**\n PrimeVue is an open source UI library for Vue featuring a rich set of 90+ components, a theme designer, various theme alternatives such as Material, Bootstrap, Tailwind, premium templates and professional support. In addition, it integrates with PrimeBlock, which has 370+ ready to use UI blocks to build spectacular applications in no time.',
            dependencies: stackBlitzParameters.dependencies,
            files
        },
        {
            newWindow: true,
            openFile: [stackBlitzParameters.sourceFileName]
        }
    );
};

export { useCodeSandbox, useStackBlitz };
