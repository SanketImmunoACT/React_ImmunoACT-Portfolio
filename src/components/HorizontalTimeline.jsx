import React, { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const HorizontalTimeline = () => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [translateX, setTranslateX] = useState(0)
    const timelineRef = useRef(null)
    const intervalRef = useRef(null)

    const timelineData = [
        {
            id: 0,
            date: "2013 - 2017",
            title: "Developed Proprietary Lentiviral Platform & CAR-T",
            year: "2013 - 2017",
            description: "ImmunoACT laid the foundation for its advanced therapies by developing a proprietary lentiviral platform and CAR-T technology. This early R&D phase focused on building a robust genetic delivery system essential for effective T-cell engineering."
        },
        {
            id: 1,
            date: "2018",
            title: "Completed Process Development of high-titer vectors for ACTs",
            year: "2018",
            description: "The company completed process development of high-titer vectors for Adoptive Cell Therapies (ACTs), a critical milestone that enhanced the scalability and consistency of CAR-T cell production."
        },
        {
            id: 2,
            date: "2019",
            title: "Completed Preclinical Characterization and Translational R&D",
            year: "2019",
            description: "A year of translational progress, ImmunoACT completed preclinical characterization and translational R&D, paving the way for regulatory submissions and clinical-grade manufacturing."
        },
        {
            id: 3,
            date: "2020",
            title: "IND Submitted, Commenced Phase I Clinical Trial",
            year: "2020",
            description: "ImmunoACT submitted its IND (Investigational New Drug application) and commenced Phase I Clinical trial, marking the transition from bench research to clinical application readiness."
        },
        {
            id: 4,
            date: "2021",
            title: "First-in-Human Dose for Pediatric and Adult DLBCL & B-ALL at Tata Memorial Hospital",
            year: "2021",
            description: "The first significant human milestone: First-in-human doses were administered for pediatric and adult patients with DLBCL and B-ALL at Tata Memorial Hospital, a key validation step for clinical efficacy."
        },
        {
            id: 5,
            date: "2022",
            title: "Commencement of 1st Scaled-up GMP Manufacturing Facility & Phase II Operations",
            year: "2022",
            description: "A major operational expansion occurred with the commencement of the first scaled-up GMP manufacturing facility and initiation of Phase II operations, supporting wider clinical trial access and production capacity."
        },
        {
            id: 6,
            date: "2023",
            title: "Market Authorization Approval Received",
            year: "2023",
            description: "A landmark achievement: ImmunoACT received market authorization approval, confirming the therapy's safety, efficacy, and readiness for commercial use in India & Following approval, ImmunoACT completed its first commercial infusion, beginning the rollout of CAR-T therapy to real-world patients outside of trial settings."
        },
        {
            id: 7,
            date: "Aug, 2024",
            title: "100 Patients Dosed, 27+ Partnered Hospitals",
            year: "August, 2024",
            description: "The company reached 100 patients dosed and partnered with over 27 hospitals, indicating growing acceptance and access to the therapy across clinical networks."
        },
        {
            id: 8,
            date: "March, 2025",
            title: "NexCAR19 (Talicabtagene autoleucel) Phase 1/2 clinical trial results published in The Lancet Haematology",
            year: "March, 2025",
            description: "Phase 1/2 clinical results of NexCAR19 (Taliocabtagene autoleucel) were published in The Lancet Haematology, providing global recognition of the therapy's clinical outcomes. Over 280 patients treated and 80+ hospitals partnered, demonstrating nationwide scale-up."
        }
    ]

    const eventsMinDistance = 140
    const timelineWidth = (timelineData.length - 1) * eventsMinDistance + 100 // Add padding for first and last events

    // Auto-advance timeline every 6 seconds
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setSelectedIndex(prevIndex => {
                const nextIndex = prevIndex + 1
                if (nextIndex >= timelineData.length) {
                    // Reset to beginning
                    setTranslateX(0)
                    return 0
                }
                return nextIndex
            })
        }, 6000)

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [timelineData.length])

    // Update timeline position when selectedIndex changes
    useEffect(() => {
        if (timelineRef.current) {
            const timelineContainer = timelineRef.current
            const containerWidth = timelineContainer.offsetWidth
            const eventPosition = selectedIndex * eventsMinDistance + 50 // Add offset for first event padding

            // Calculate optimal translate position to center the selected event
            let newTranslateX = -(eventPosition - containerWidth / 2)

            // Constrain translation bounds with proper padding
            const maxTranslate = 50 // Allow some padding on the left
            const minTranslate = -(timelineWidth - containerWidth + 50) // Allow padding on the right

            newTranslateX = Math.max(minTranslate, Math.min(maxTranslate, newTranslateX))
            setTranslateX(newTranslateX)
        }
    }, [selectedIndex, eventsMinDistance, timelineWidth])

    const handlePrevious = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : timelineData.length - 1))
    }

    const handleNext = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }
        setSelectedIndex(prev => (prev < timelineData.length - 1 ? prev + 1 : 0))
    }

    const handleEventClick = (index) => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }
        setSelectedIndex(index)
    }

    return (
        <div className="cd-horizontal-timeline w-full max-w-7xl mx-auto">
            {/* Timeline Navigation */}
            <div className="timeline relative h-24 px-12">
                <div className="events-wrapper relative h-full overflow-hidden" ref={timelineRef}>
                    {/* Timeline Line */}
                    <div
                        className="events absolute left-0 top-1/2 h-0.5 bg-gray-300 transition-transform duration-400"
                        style={{
                            width: `${timelineWidth}px`,
                            transform: `translateX(${translateX}px) translateY(-50%)`
                        }}
                    >
                        {/* Filling Line */}
                        <div
                            className="filling-line absolute left-0 top-0 h-full bg-[#47A178] transition-all duration-500 ease-in-out"
                            style={{ 
                                width: `${selectedIndex > 0 ? (selectedIndex * eventsMinDistance + 50) : 0}px`
                            }}
                        />

                        {/* Timeline Events */}
                        {timelineData.map((event, index) => (
                            <button
                                key={event.id}
                                className={`absolute bottom-0 pb-4 text-center text-sm transform -translate-x-1/2 transition-colors duration-300 ${index === selectedIndex ? 'text-[#47A178]' : 'text-gray-600'
                                    }`}
                                style={{ left: `${index * eventsMinDistance + 50}px` }}
                                onClick={() => handleEventClick(index)}
                            >
                                {event.date}
                                <div
                                    className={`absolute left-1/2 transform -translate-x-1/2 -bottom-1 w-3 h-3 rounded-full border-2 transition-colors duration-300 ${index === selectedIndex
                                            ? 'bg-[#47A178] border-[#47A178]'
                                            : index < selectedIndex
                                                ? 'bg-[#7b9d6f] border-[#7b9d6f]'
                                                : 'bg-white border-gray-300'
                                        }`}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Navigation Buttons */}
                <button
                    className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors duration-300 ${selectedIndex === 0
                            ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                            : 'border-gray-300 text-gray-600 hover:border-[#7b9d6f] hover:text-[#7b9d6f]'
                        }`}
                    onClick={handlePrevious}
                    disabled={selectedIndex === 0}
                >
                    <ChevronLeft size={16} />
                </button>

                <button
                    className={`absolute right-0 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors duration-300 ${selectedIndex === timelineData.length - 1
                            ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                            : 'border-gray-300 text-gray-600 hover:border-[#7b9d6f] hover:text-[#7b9d6f]'
                        }`}
                    onClick={handleNext}
                    disabled={selectedIndex === timelineData.length - 1}
                >
                    <ChevronRight size={16} />
                </button>
            </div>

            {/* Events Content */}
            <div className="events-content min-h-[200px] my-9">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl md:text-3xl font-medium text-[#47A178]">
                        {timelineData[selectedIndex].title}
                    </h2>
                    <em className="block text-xl text-[#4c4c47] mt-3 mb-1">
                        {timelineData[selectedIndex].year}
                    </em>
                    <p className="text-base md:text-lg text-[#363636]">
                        {timelineData[selectedIndex].description}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default HorizontalTimeline