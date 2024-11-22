import React, { useState, useEffect, useCallback } from "react";
import { getAudiobooks } from "../api/api";
import Card from "../components/cards/Card"; 
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/search/SearchBar";
import SkeletonCard from "../components/skeletons/SkeletonCard"; 
import useEmblaCarousel from "embla-carousel-react";

function Inicio() {
    const [audiobooks, setAudiobooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 8;

    useEffect(() => {
        const fetchAudiobooks = async () => {
            setLoading(true);
            try {
                const response = await getAudiobooks();
                if (Array.isArray(response.data)) {
                    setAudiobooks(response.data);
                } else {
                    console.error("La respuesta no es un array:", response.data);
                    setAudiobooks([]);
                }
            } catch (error) {
                console.error("Error fetching audiobooks:", error);
                setAudiobooks([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAudiobooks();
    }, []);

    const handleCardClick = (id) => {
        navigate(`/preview/${id}`);
    };

    const groupedAudiobooks = [];
    for (let i = 0; i < audiobooks.length; i += itemsPerPage) {
        groupedAudiobooks.push(audiobooks.slice(i, i + itemsPerPage));
    }

    const scrollToIndex = useCallback((index) => {
        if (emblaApi) emblaApi.scrollTo(index);
    }, [emblaApi]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on("select", () => {
            setCurrentIndex(emblaApi.selectedScrollSnap());
        });
    }, [emblaApi]);

    return (
        <div className="px-4 md:px-20">
            <SearchBar />
            <div className="max-w-7xl mx-auto mt-8">
                <div className="relative">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex">
                            {loading
                                ? [...Array(2)].map((_, pageIndex) => (
                                      <div
                                          key={pageIndex}
                                          className="flex-[0_0_100%] grid grid-cols-2 sm:grid-cols-4 grid-rows-2 gap-4 p-4"
                                      >
                                          {[...Array(8)].map((_, index) => (
                                              <SkeletonCard key={index} />
                                          ))}
                                      </div>
                                  ))
                                : groupedAudiobooks.map((group, pageIndex) => (
                                      <div
                                          key={pageIndex}
                                          className="flex-[0_0_100%] grid grid-cols-2 sm:grid-cols-4 grid-rows-2 gap-4 p-4"
                                      >
                                          {group.map((audiobook) => (
                                              <Card
                                                  key={audiobook.id}
                                                  id={audiobook.id}
                                                  title={audiobook.title}
                                                  author={audiobook.author}
                                                  coverUrl={audiobook.coverUrl}
                                                  duration={audiobook.duration}
                                                  averagerating={
                                                      audiobook.averageRating
                                                  }
                                                  onClick={() =>
                                                      handleCardClick(
                                                          audiobook.id
                                                      )
                                                  }
                                              />
                                          ))}
                                      </div>
                                  ))}
                        </div>
                    </div>
                </div>
            
                {groupedAudiobooks.length > 1 && (
          <div className="flex justify-center items-center mt-4 space-x-2">
        
          <button
              onClick={scrollPrev}
              className="bg-gradient-to-r from-gray-800 to-gray-700 text-white px-4 py-2 rounded-md shadow-lg hover:from-gray-600 hover:to-gray-500 hover:scale-105 transform transition-all duration-200"
          >
              &#60;
          </button>
       
          {groupedAudiobooks.map((_, index) => (
              <button
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  className={`px-4 py-2 rounded-md shadow-lg ${
                      currentIndex === index
                          ? "bg-blue-500 text-white border-2 border-blue-500"
                          : "bg-gray-200 text-gray-700"
                  } hover:bg-gray-300 hover:scale-105 transform transition-all duration-200`}
              >
                  {index + 1}
              </button>
          ))}
   
          <button
              onClick={scrollNext}
              className="bg-gradient-to-r from-gray-800 to-gray-700 text-white px-4 py-2 rounded-md shadow-lg hover:from-gray-600 hover:to-gray-500 hover:scale-105 transform transition-all duration-200"
          >
              &#62;
          </button>
      </div>
      
                )}
            </div>
        </div>
    );
}

export default Inicio;
