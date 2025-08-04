const baseDate = new Date('2025-08-04');
const weeks = [
  { title: "專案啟動與需求盤點", description: "專案範疇與目標定義書、數據資產盤點與字典" },
  { title: "架構設計與環境準備", description: "現有系統架構圖、整合架構設計草圖、API 與 Atom 元件架構圖、Git 版本控制導入計畫" },
  { title: "UiPath 原型開發", description: "郵件處理需求規格書" },
  { title: "SAS Viya 與整合設計", description: "設計文件與週報" },
  { title: "三系統串接原型開發", description: "程式碼原型" },
  { title: "自動化與測試", description: "三系統串接測試計畫與測試案例、每日自動異常通知與排程執行紀錄範例" },
  { title: "報告撰寫與文件整理", description: "《三年業績技術架構報告書》、內部 Prompt 可複用範本集、完整技術文件、甘特圖" },
  { title: "驗收、展示與總結", description: "部署手冊 (Deployment Guide)、專案結案報告與 KPI 效益展示" }
];
weeks.forEach((w, i) => {
  window.useAppStore.getState().addTask({
    title: w.title,
    description: w.description,
    assigneeId: 7,
    dueDate: new Date(baseDate.getTime() + i * 7 * 24 * 60 * 60 * 1000).toISOString()
  });
});