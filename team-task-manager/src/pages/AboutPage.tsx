import React, { useEffect, useState } from 'react';
import * as mammoth from 'mammoth';
import SeminarCard from '../components/SeminarCard';
import { SeminarCardProps } from '../types';

const AboutPage: React.FC = () => {
  const [seminarCards, setSeminarCards] = useState<SeminarCardProps[]>([]);

  const handleDetailsClick = (htmlContent: string) => {
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(htmlContent);
      newWindow.document.close();
    }
  };

  useEffect(() => {
    const fetchAndParseDocs = async () => {
      const docPaths = [
        '/docs/pages/aus/156_resource/docs/150_integration_study.docx',
        '/docs/pages/aus/156_resource/docs/160_south_africa_lithium_battery_market_bp.docx',
        '/docs/pages/aus/156_resource/docs/999_work_contract.docx',
        '/docs/pages/aus/156_resource/docs/req_2_gpt_prompt.docx',
        '/docs/pages/aus/156_resource/docs/software_integration_strategy_and_performance_planning.docx',
      ];

      const parsedCards: SeminarCardProps[] = await Promise.all(
        docPaths.map(async (path) => {
          try {
            const response = await fetch(path);
            const arrayBuffer = await response.arrayBuffer();
            const result = await mammoth.convertToHtml({ arrayBuffer });
            const htmlContent = result.value;

            // Basic parsing from HTML content
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlContent, 'text/html');

            const titleElement = doc.querySelector('h1, h2');
            const descriptionElement = doc.querySelector('p');

            const title = titleElement ? titleElement.textContent || 'Untitled Document' : 'Untitled Document';
            const description = descriptionElement ? descriptionElement.textContent || '' : '';

            return {
              category: '案例研究', // Default category
              title: title,
              description: description,
              htmlContent: htmlContent, // Store the HTML content
              // Other fields are null/undefined as they are not easily extractable from general docx
              imageUrl: undefined,
              startDate: undefined,
              format: undefined,
              organizer: undefined,
              systemTag: undefined,
              speaker: undefined,
              onDetailsClick: handleDetailsClick, // Will be set by the parent component
            };
          } catch (error) {
            console.error(`Error processing ${path}:`, error);
            return {
              category: '錯誤',
              title: `無法載入文件: ${path.split('/').pop()}`,
              description: '文件載入或解析失敗。',
              htmlContent: '<h1>文件載入失敗</h1><p>請檢查控制台錯誤。</p>', // Provide fallback HTML
              imageUrl: undefined,
              startDate: undefined,
              format: undefined,
              organizer: undefined,
              systemTag: undefined,
              speaker: undefined,
              onDetailsClick: handleDetailsClick,
            };
          }
        })
      );
      setSeminarCards(parsedCards);
    };

    fetchAndParseDocs();
  }, []);

  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {seminarCards.map((card, index) => (
          <SeminarCard key={index} {...card} onDetailsClick={handleDetailsClick} />
        ))}
      </div>
    </div>
  );
};

export default AboutPage;
