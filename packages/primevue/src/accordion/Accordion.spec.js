import { mount } from '@vue/test-utils';
import { expect, it } from 'vitest';
import AccordionTab from '../accordiontab/AccordionTab.vue';
import Accordion from './Accordion.vue';

describe('Accordion.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(Accordion, {
            global: {
                components: {
                    AccordionTab
                }
            },
            slots: {
                default: `
                    <AccordionTab header="Header I">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                            ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </AccordionTab>
                    <AccordionTab header="Header II">
                        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                            architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
                            voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.</p>
                    </AccordionTab>
                    <AccordionTab header="Header III">
                        <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
                            cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
                            Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.</p>
                    </AccordionTab>`
            }
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should Accordion and AccordionTab component exist', () => {
        expect(wrapper.find('.p-accordion.p-component').exists()).toBe(true);
        expect(wrapper.find('.p-accordionpanel').exists()).toBe(true);
        expect(wrapper.findAll('.p-accordionpanel').length).toBe(3);
    });

    it('should activeIndex change', async () => {
        await wrapper.setProps({ activeIndex: 1 });

        const allTabs = wrapper.findAll('.p-accordionpanel');

        expect(allTabs[0].classes()).not.toContain('p-accordionpanel-active');
        expect(allTabs[1].classes()).toContain('p-accordionpanel-active');
    });

    it('should work panel click', async () => {
        const firstHeader = wrapper.find('button.p-accordionheader');

        await firstHeader.trigger('click');

        expect(wrapper.emitted()['update:activeIndex'][0]).toEqual([0]);
        expect(wrapper.emitted()['tab-click'][0][0].index).toEqual(0);
    });
});
