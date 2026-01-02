const Sitemap = () => {
    return (
        <div className=" bg-white">
            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                <h1 className="text-[43px] font-medium text-[#363636] mb-6">Sitemap</h1>

                <div className="">
                    {/* About Section */}
                    <div>
                        <h2 className="text-4xl font-medium text-[#4F4F4F] mb-3 mt-12 border-b border-[#DDDEDF] pb-3">About</h2>
                        <ul className="space-y-3 font-medium">
                            <li>
                                <a href="/about#who-we-are" className="text-[#47A178] text-lg mb-3 hover:text-teal-700 transition-colors">
                                    Who we are
                                </a>
                            </li>
                            <li>
                                <a href="/about#team" className="text-[#47A178] text-lg mb-3 hover:text-teal-700 transition-colors">
                                    Team
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Science Section */}
                    <div>
                        <h2 className="text-4xl font-medium text-[#4F4F4F] mb-3 mt-12 border-b border-[#DDDEDF] pb-3">Science</h2>
                        <ul className="space-y-3 font-medium">
                            <li>
                                <a href="/science#research" className="text-[#47A178] text-lg mb-3 hover:text-teal-700 transition-colors">
                                    Research
                                </a>
                            </li>
                            <li>
                                <a href="/science" className="text-[#47A178] text-lg mb-3 hover:text-teal-700 transition-colors">
                                    Process
                                </a>
                            </li>
                            <li>
                                <a href="/science#pipeline" className="text-[#47A178] text-lg mb-3 hover:text-teal-700 transition-colors">
                                    Pipeline
                                </a>
                            </li>
                            <li>
                                <a href="/science#publications" className="text-[#47A178] text-lg mb-3 hover:text-teal-700 transition-colors">
                                    Publications
                                </a>
                            </li>
                            <li>
                                <a href="/science#plasmid" className="text-[#47A178] text-lg mb-3 hover:text-teal-700 transition-colors">
                                    Plasmids
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* NexCAR19 Section */}
                    <div>
                        <h2 className="text-4xl font-medium text-[#4F4F4F] mb-3 mt-12 border-b border-[#DDDEDF] pb-3">NexCAR19</h2>
                        <ul className="space-y-3 font-medium">
                            <li>
                                <a href="/nexcar19" className="text-[#47A178] text-lg mb-3 hover:text-teal-700 transition-colors">
                                    Patients
                                </a>
                            </li>
                            <li>
                                <a href="/nexcar19-hcp" className="text-[#47A178] text-lg mb-3 hover:text-teal-700 transition-colors">
                                    Healthcare Professionals
                                </a>
                            </li>
                            <li>
                                <a href="/nexcar19#treatment-process" className="text-[#47A178] text-lg mb-3 hover:text-teal-700 transition-colors">
                                    Treatment Process
                                </a>
                            </li>
                            <li>
                                <a href="/treatment-centres" className="text-[#47A178] text-lg mb-3 hover:text-teal-700 transition-colors">
                                    Partnered Treatment Centres
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Media Section */}
                    <div>
                        <h2 className="text-4xl font-medium text-[#4F4F4F] mb-3 mt-12 border-b border-[#DDDEDF] pb-3">Media</h2>
                        <ul className="space-y-3 font-medium">
                            <li>
                                <a href="/media" className="text-[#47A178] text-lg mb-3 hover:text-teal-700 transition-colors">
                                    Newsroom
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Philanthropy Section */}
                    <div>
                        <h2 className="text-4xl font-medium text-[#4F4F4F] mb-3 mt-12 border-b border-[#DDDEDF] pb-3">Philanthropy</h2>
                        <ul className="space-y-3 font-medium">
                            <li>
                                <a href="/philanthropy" className="text-[#47A178] text-lg mb-3 hover:text-teal-700 transition-colors">
                                    ImmunoACT Foundation
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Careers Section */}
                    <div>
                        <h2 className="text-4xl font-medium text-[#4F4F4F] mb-3 mt-12 border-b border-[#DDDEDF] pb-3">Careers</h2>
                        <ul className="space-y-3 font-medium">
                            <li>
                                <a href="/careers" className="text-[#47A178] text-lg mb-3 hover:text-teal-700 transition-colors">
                                    Current Job Openings
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Sitemap