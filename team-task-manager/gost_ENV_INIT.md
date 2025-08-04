======使用 poetry 管理專案
使用專案，若是舊的專案
先確保開發環境安裝 權域工具 poetry
若是舊專案，不需要init，會直接依poetry.lock記載的套件版本安裝到虛擬環境中！類似npm install
  poetry install

--安裝 全域
  brew install poetry
  poetry --version
更新版本
  poetry self update
移除本身
  python get-poetry.py --uninstall

檢查設定
  poetry config --list

  調整為 虛擬環境建立時 建立在專案下的 venv
  poetry config virtualenvs.in-project true
安裝 全域--

--
建立虛擬環境
  poetry env use [python 的位置 看要用哪一個版本]
  poetry env use /usr/local/opt/python@3.8/bin/python3.8
移除虛擬環境 
  直接刪掉 .venv 就好

--
檢查套件包
  poetry show [package] --tree
  poetry add <package>@latest --dry-run  不會做安裝的動作

加入依賴 [-D 開發環境專用的套件]
  poetry add package[=xx.xx.xx] [-D]
  poetry remove package

--
每次調整套件包依賴時要做以下動作 ，不要用 pip freeze > requirements.txt
匯出 -f requirements.txt -o requirements.txt [--without-hashes]
  也可保留 hashes ,pip install 時可以利用 [https://pip.pypa.io/en/stable/topics/secure-installs/]
  [poetry export]
  執行環境 requirements.txt
  poetry export -f requirements.txt -o requirements.txt --without-hashes
  
  運作測試環境 requirements-dev.txt
  poetry export -f requirements-dev.txt -o requirements-dev.txt --without-hashes --dev

保留 requirements.txt 的原因是為了部署時使用(部署時可以不安裝 poetry，使用 pip install -r )

--

======  架構調整
distribution: 放置 建置好的模型相關檔案，請規劃子資料夾使用
Resources: 資源夾 放置一些靜態被參考的資料 或暫存黨
tests: 若有測試程式相關都放這邊
src: 原始碼的部分
  ball_divination: 原模型的相關程式
  config: 參數統一管理，使用dynaconf 套件。請規劃資料夾使用。 plug.py 插頭檔案統一管理
    .env: MYBALL_ENV=default 。 系統分段管理環境參數，若是開發或是一般作業，用 default ,development
          部署時會被調整為 production
          distribution , Resources 都有定義在環境設定中，要用絕對路徑。部署時也會被改寫。
        所以，部署時的檔案內容可能為
        MYBALL_ENV=production
        MYBALL_DISTRIBUTION_PATH=/app/distribution
        MYBALL_RESOURCES_PATH=/app/resources
  new2_divination: 新模型模型的相關程式
  ...





======以下 conda 的環境 備份
確認你的 anaconda 環境存在後
０．
distribution 你自己放你給我的那些

１．原則上會建立一段時間
建立一組虛擬環境 名字為oldmodel (environment.yml 在打包的夾裡)
    conda env create -n oldmodel-py38 -f environment.yml python=3.8  --force

２．如果有環境問題 可能是你本機要裝 hadoop
    brew install hadoop 

完成後 編輯你的 bashrc 或 zshrc

    export JAVA_HOME=/usr/local/Cellar/openjdk@11/11.0.16.1_1
    export PATH=$PATH:$JAVA_HOME/bin

    export HADOOP_HOME=/usr/local/Cellar/hadoop/3.3.4
    export PATH=$PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin

３．確認一下你剛剛裝的環境
    conda env list

    # conda environments:
    #
    base                  *  /Users/mac/opt/anaconda3
    oldmodel              /Users/xxxxxxxx/opt/anaconda3/envs/oldmodel

切換到你要執行的環境：
    conda activate oldmodel
若不要用了 要切回基本環境：
    conda deactivate

４．原則上，以上環境應該就會準備好
    實際跑的時候 要注意一些 json 的設定對不對

    我只有跑預測，所以一些城市是沒有改道的，如果你遇到跑程式錯誤，就自己條一下第一層目錄裡的那些城市

