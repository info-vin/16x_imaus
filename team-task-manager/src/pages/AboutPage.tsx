import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import * as mammoth from 'mammoth';

const AboutPage: React.FC = () => {
  const [slides, setSlides] = useState<string[]>([]);

  useEffect(() => {
    const fetchDocs = async () => {
      const docPaths = [
        '/docs/pages/aus/156_resource/docs/150_integration_study.docx',
        '/docs/pages/aus/156_resource/docs/160_south_africa_lithium_battery_market_bp.docx',
        '/docs/pages/aus/156_resource/docs/999_work_contract.docx',
        '/docs/pages/aus/156_resource/docs/req_2_gpt_prompt.docx',
        '/docs/pages/aus/156_resource/docs/software_integration_strategy_and_performance_planning.docx',
      ];

      const fetchedSlides = await Promise.all(
        docPaths.map(async (path) => {
          const response = await fetch(path);
          const arrayBuffer = await response.arrayBuffer();
          const result = await mammoth.convertToHtml({ arrayBuffer });
          return result.value;
        })
      );

      setSlides(fetchedSlides);
    };

    fetchDocs();
  }, []);

  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
      >
        {slides.map((slideContent, index) => (
          <SwiperSlide key={index}>
            <div className="prose dark:prose-invert max-w-none p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg" dangerouslySetInnerHTML={{ __html: slideContent }} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AboutPage;