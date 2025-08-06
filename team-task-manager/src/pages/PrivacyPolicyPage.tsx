import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 p-8">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-6">隱私權政策</h1>
        <p className="mb-4">
          本隱私權政策旨在說明 [您的公司名稱]（以下簡稱「我們」）如何收集、使用、分享和保護您的個人資訊。我們致力於保護您的隱私權，並確保您的個人資料受到適當的保護。
        </p>
        <h2 className="text-2xl font-bold text-white mt-6 mb-4">我們收集的資訊</h2>
        <p className="mb-4">
          我們可能收集以下類型的個人資訊：
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>您註冊帳戶時提供的資訊，例如您的姓名、電子郵件地址和密碼。</li>
          <li>您在使用我們的服務時產生的資訊，例如您的任務、專案和其他活動。</li>
          <li>您與我們聯繫時提供的資訊，例如您的電子郵件地址和訊息內容。</li>
        </ul>
        <h2 className="text-2xl font-bold text-white mt-6 mb-4">我們如何使用您的資訊</h2>
        <p className="mb-4">
          我們可能將您的個人資訊用於以下目的：
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>提供、維護和改進我們的服務。</li>
          <li>與您溝通，包括回覆您的問題和要求。</li>
          <li>保護我們的權利和財產。</li>
        </ul>
        <h2 className="text-2xl font-bold text-white mt-6 mb-4">您的權利</h2>
        <p className="mb-4">
          根據《個人資料保護法》，您有權查詢、閱覽、複製、補充、更正、停止收集、處理、利用或刪除您的個人資料。您可以透過 [您的聯絡方式] 與我們聯繫以行使您的權利。
        </p>
        <h2 className="text-2xl font-bold text-white mt-6 mb-4">隱私權政策的變更</h2>
        <p className="mb-4">
          我們可能會不時修訂本隱私權政策。當我們對本隱私權政策進行重大變更時，我們會在我們的網站上發布通知。
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
