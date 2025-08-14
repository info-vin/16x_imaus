import React from 'react';
import { SeminarCardProps } from '../types'; // Assuming types are in ../types/index.ts

const SeminarCard: React.FC<SeminarCardProps> = ({
  category,
  title,
  imageUrl,
  startDate,
  format,
  organizer,
  description,
  systemTag,
  speaker,
  onDetailsClick,
  htmlContent,
}) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
      {/* 圖片容器 (Image Container) */}
      <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
        {category && (
          <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
            {category}
          </span>
        )}
        {speaker && (
          <div className="absolute bottom-2 left-2 flex items-center bg-black bg-opacity-50 rounded-full pr-3">
            {speaker.avatar ? (
              <img src={speaker.avatar} alt={speaker.name} className="w-8 h-8 rounded-full mr-2 border-2 border-white" />
            ) : (
              <div className="w-8 h-8 rounded-full mr-2 bg-gray-500 flex items-center justify-center text-white text-xs">
                {speaker.name.charAt(0)}
              </div>
            )}
            <div className="text-white text-sm">
              <p className="font-semibold">{speaker.name}</p>
              {speaker.title && <p className="text-xs">{speaker.title}</p>}
            </div>
          </div>
        )}
      </div>

      {/* 內容區域 (Content Area) */}
      <div className="p-4 flex-grow flex flex-col">
        {systemTag && (
          <span className="text-xs text-gray-400 mb-1">{systemTag}</span>
        )}
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        {description && (
          <p className="text-gray-300 text-sm mb-4 flex-grow line-clamp-3">{description}</p>
        )}
        <div className="text-gray-400 text-sm space-y-1 mt-auto">
          <p>
            <strong>日期:</strong> {startDate || "Null"}
          </p>
          <p>
            <strong>舉辦方式:</strong> {format || "Null"}
          </p>
          <p>
            <strong>主辦單位:</strong> {organizer || "Null"}
          </p>
        </div>
      </div>

      {/* 操作區域 (Action Area) */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={() => onDetailsClick(htmlContent || '')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
        >
          詳情按鈕
        </button>
      </div>
    </div>
  );
};

export default SeminarCard;
