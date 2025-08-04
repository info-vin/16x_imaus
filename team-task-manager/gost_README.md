# tsgnc-lovely-ghostwriter

## 環境安裝 - local[開發環境]
專案使用 poetry 套件進行依賴管理。
資料夾定義簡略說明：
```
project/docker 打包規劃(打包命令 docker_build_image.sh)
project/resources 存置 使用的資源
project/src 為原始碼的放置區
project/tests 為測試程式放置區

套件安裝時務必區別 測試依賴與非測試依賴
```

專案正常開始前請先在全域環境安裝 poetry
```
brew install poetry
#完成後 檢視版號出現為成功
poetry --version
#調整為 虛擬環境建立時 建立在專案下的 .venv --- 非常重要
poetry config virtualenvs.in-project true
```
python 版本為依賴為 3.9，所以請在執行虛擬環境套件安裝前先確認開發環境存在 此版本
```
#git clone後 ，在專案資料夾下安裝虛擬環境套件
poetry install
#完成後，驅動虛擬環境
source ./.venv/bin/activate
#退出虛擬環境
deactivate
#移除虛擬環境 重建 
  直接刪掉 .venv 後重新 poetry install
```
其他重要指令
```
#以樹狀結構顯示單一或全部套件
poetry show [package] --tree
#查詢套件 例：poetry add google-api-python-client@latest --dry-run
poetry add <package>@latest --dry-run  不會做安裝的動作
#安裝套件 ，若為測試區用套件請加上標籤 -D
poetry add [package=version] [-D]
#移除套件 ，若為測試區用套件請加上標籤 -D
poetry remove package [-D]
```

匯出一般用依賴檔
```
#匯出 -f requirements.txt -o requirements.txt [--without-hashes]
#在專案資料夾根目錄
poetry export -f requirements.txt -o requirements.txt --without-hashes

#測試用依賴：可不必執行
poetry export -f requirements-dev.txt -o requirements-dev.txt --without-hashes --dev
```
---


### **最小化架構調整**
<details> <summary> tree </summary>

  ```bash
    .
    ├── ENV_INIT.md
    ├── distribution        (放置建置完成模型相關檔案,請規劃子資料夾使用)
    │   └── models          (*規劃models子資料夾為現行 moving avg 2 15 had 使用))
    │       └── 215
    │           ├── best_model
    │           │   └── tf250.h5
    │           └── varify
    │               ├── classifier_FT_700T1.sav
    │               ├── classifier_FT_700T2.sav
    │               ├── classifier_H1_700T1.sav
    │               ├── classifier_H1_700T2.sav
    │               ├── classifier_H2_700T1.sav
    │               ├── classifier_H2_700T2.sav
    │               ├── classifier_Q1_700T1.sav
    │               ├── classifier_Q1_700T2.sav
    │               ├── classifier_Q2_700T1.sav
    │               ├── classifier_Q2_700T2.sav
    │               ├── classifier_Q3_700T1.sav
    │               ├── classifier_Q3_700T2.sav
    │               ├── classifier_Q4_700T1.sav
    │               └── classifier_Q4_700T2.sav
    ├── docker
    │   ├── Dockerfile
    │   └── docker_build_image.sh
    ├── docs                              (說明文件...等)
    ├── environment.yml
    ├── poetry.lock
    ├── pyproject.toml
    ├── requirements.txt
    ├── resources           (資源夾,放置一些靜態被參考的資料或暫存檔)
    ├── resources
    └── google_drive
    │   ├── _credentials.json
    │   └── _token.json.py
    ├── src                  (原始碼)
    │   ├── ball_divination  (原模型相關程式)
    │   │   ├── __init__.py
    │   │   ├── app.py
    │   │   ├── app_pinkhad.py 
    │   │   ├── app_simulation.py
    │   │   ├── autolearning
    │   │   │   └── __init__.py
    │   │   ├── deeplearning
    │   │   │   └── __init__.py
    │   │   ├── job       
    │   │   │   └──__init__.py
    │   │   ├── labeling       
    │   │   │   ├── __init__.py
    │   │   │   └── util_box.py
    │   │   └── predict_tool
    │   │       ├── __init__.py
    │   │       ├── pinkhad.py        (**日常預測執行檔**)
    │   │       ├── predict_report.py
    │   │       └── simulation.py     (**單季模擬預測執行檔**)
    │   ├── config    (*參數統一管理，使用dynaconf 套件。請規劃資料夾使用)
    │   │   ├── __init__.py
    │   │   ├── database          
    │   │   │   ├── mysql_nba.json
    │   │   │   ├── mysql_nba.local.json
    │   │   │   ├── mysql_nba.yml
    │   │   │   ├── mysql_tsgnc.json
    │   │   │   ├── mysql_tsgnc.local.json
    │   │   │   └── mysql_tsgnc.yml
    │   │   ├── global
    │   │   │   └── good.yaml
    │   │   ├── googledrive
    │   │   │   └── drive_config.json     (*google_drive.py路徑參數檔)
    │   │   ├── job
    │   │   ├── plug.py                   (*插頭檔案統一管理)
    │   │   ├── .env                  (*插頭檔案統一管理)
    │   │   └── predict
    │   │       └── pink_had_report.json  (*模擬路徑與參數檔)
    │   └── utils
    │       ├── __init__.py
    │       ├── google_drive.py
    │       └── process_logging.py
    ├── rabbit_hole
    │   ├── __init__.py
    │   ├── app.py
    │   ├── autolearning
    │   │   ├── HopsEfficientBlock.py
    │   │   ├── __init__.py
    │   │   ├── loadtt.py
    │   │   └── tfautokeraseffblock.py
    │   ├── deeplearning
    │   │   ├── __init__.py
    │   │   ├── deeplearning.py
    │   │   └── nnkits.py
    │   ├── job
    │   │   ├── __init__.py
    │   │   ├── joba.py
    │   │   ├── jobb.py
    │   │   ├── jobc.py
    │   │   └── jobcauto.py
    │   ├── labeling
    │   │   ├── __init__.py
    │   │   ├── classifierchain_old.py
    │   │   ├── getlabeledata.py
    │   │   ├── skgaussianmixture.py
    │   │   ├── skrandomforestclassifier.py
    │   │   ├── util_box.py
    │   │   └── varifiedclassifier.py
    │   └── predict_tool
    │       └── __init__.py
    └── tests      (若有測試程式相關都放這邊)
        └── __init__.py

```
  
</details>

---

### **tips**

/src: 原始碼的部分
  >- /ball_divination: 原模型的相關程式
  >- /config: 參數統一管理，使用dynaconf 套件。請規劃資料夾使用。
  >>-  plug.py 插頭檔案統一管理
  >>- .env: MYBALL_ENV=default 。
  >> 系統分段管理環境參數，若是開發或是一般作業，用 default, development 部署時會被調整為 production.
  >> distribution , resources 都有定義在環境設定中，要用絕對路徑。部署時也會被改寫。

    所以，部署時的檔案內容可能為
    ```bash
    MYBALL_ENV=production
    MYBALL_DISTRIBUTION_PATH=/app/distribution
    MYBALL_RESOURCES_PATH=/app/resources
    ```

  >- /rabbit_hole: 新模型模型的相關程式(參考範例)
  >- ...

---

## 日常流程

:require:
host: airflow 主機必須開啟資料庫連線.

```python
Quick start:

As all default as normail daily job, connect to database, today, 
save predict record to google drive:
   
    >>> python src/ball_divination/app_pinkhad.py

As function test, `no connect with` database, assign date, 
`not` save to google drive:

    >>> python src/ball_divination/app_pinkhad.py -c 0 -d 2022-12-22 --no-to_drive
    ...
    2022-12-26 16:52:01,183 [pinkhad.py:847][INFO] no-to_drive
    [800, 'pinkhad'] f. 

As operation as post-process, connect to database, assign date, 
save preidct record to google drive:

    >>> python src/ball_divination/app_pinkhad.py -c 1 -d 2022-12-22 --to_drive
    ...
    File ID: 18leZF52DNcIhUygrd3yEfGgGpb_hKER5
    [800, 'pinkhad'] f.
```

## 球季模擬流程

:require:

- ./distribution/models/215/\*.\* as **pinkhad.py** need.
- ./config/predict/pink_had_report.json
- ./resources/MK_odds.csv
- ./resources/nba_202122_2_15.csv(download from google drive:/NBA/Temp/nba_202122_2_15.csv)
- database connect.

:return:

- ./predict/simulate/sim_20yyyy.csv

```python
Quick start:

As all default as normal function tyest, debug_index with first start_date, 
default season_year in `202122`, save simulation predict record to resource_path:

    >>> python src/ball_divination/app_simulation.py
    ...
    2022-12-26 17:17:22,798 [simulation.py:371][INFO] simulation f.
    [600, 'simulation'] f. 

    >>> tree predict/simulate
    predict/simulate
    └── sim_202122.csv

As full season simulation, debug_index is 0, default season_year in `202122`,
save simulation predict record to resource_path:

    >>> python src/ball_divination/app_simulation.py -d 0 -s 202122
  
    >>> tree predict/simulate
    predict/simulate
    └── sim_202122.csv

```
 
