import { Fragment } from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import Print from "@/components/ui/dev/print";
import {GenericContent} from "@/interface/content";
import Wizard from "@/components/wizard";



type Props = {
    generic: GenericContent
    product: any
}

export default function ProductTabs(props: Props): any
{
    const tabs = [
        {
            name: 'Overzicht',
            children: <Print context={props.product}/>
        },
        {
            name: 'Data & Prijzen',
            children: <Wizard product={props.product} generic={props.generic}/>
        },
        {
            name: 'Dagprogramma',
            children: <Print context={props.product}/>
        },
        {
            name: 'Hotels',
            children: <Print context={props.product}/>
        },
        {
            name: 'Verlengen/Upgrades/Extra\'s',
            children: <Print context={props.product}/>
        },
        {
            name: 'Vervoersopties',
            children: <Print context={props.product}/>
        },
        {
            name: 'Praktische informatie',
            children: <Print context={props.product}/>
        },
    ]
    return (
        <div className="mx-auto max-w-7xl">
            <TabGroup className="">
                <div className="-mx-4 flex overflow-x-auto sm:mx-0 sticky top-28">
                    <div className="flex-auto border-b border-gray-200 px-4 sm:px-0">
                        <TabList className="-mb-px flex space-x-10 justify-evenly bg-white">
                            {tabs.map((tab) => (
                                <Tab
                                    key={tab.name}
                                    className="border-b-2 border-transparent py-6 text-md font-medium whitespace-nowrap text-gray-500 hover:border-gray-700 hover:text-gray-700 data-selected:border-nrv-orange data-selected:text-nrv-orange"
                                >
                                    {tab.name}
                                </Tab>
                            ))}
                        </TabList>
                    </div>
                </div>

                <TabPanels as={Fragment}>
                    {tabs.map((tab) => (
                        <TabPanel key={tab.name} className="space-y-16 pt-10 lg:pt-16">
                            {tab.children}
                        </TabPanel>
                    ))}
                </TabPanels>
            </TabGroup>
        </div>
    )
}