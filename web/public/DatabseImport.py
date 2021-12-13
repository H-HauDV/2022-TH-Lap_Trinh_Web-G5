import os
import pymysql
from datetime import datetime
mangapath = 'Mangas'
mangaList = os.listdir(mangapath)
conn = pymysql.connect(host="localhost",user="root",passwd="",db="manga_web3")
myCursor = conn.cursor()

def Get_curren_timestamp():
	now = datetime.now()

	dt_string = now.strftime("%Y-%m-%d %H:%M:%S")
	return dt_string
def InsertChapter(chapter, manga_name, manga_id):
	userID=1
	chapterName=str(chapter)
	current_date=Get_curren_timestamp()
	chapterLink="/Mangas/"+manga_name+"/"+chapterName
	sql=('INSERT INTO chapter_manga (manga_id, chapter_name, added_date, update_date, chapter_count, added_by, source_link) VALUES (%s, %s, %s, %s, %s, %s,  %s) ',(manga_id, chapterName, current_date, current_date, chapter, userID, chapterLink))
	myCursor.execute(*sql)
	conn.commit()
def InsertImage(chapter_id, manga_name,image, chapter):
	chapterName=str(chapter)
	realImageLink="/Mangas/"+manga_name+"/"+chapterName+"/"+image
	imageCount=(''.join(filter(str.isdigit, image)))
	sql=('INSERT INTO chapter_image (chapter_id, image_link, image_count) VALUES (%s, %s, %s) ',( chapter_id, realImageLink, imageCount))
	myCursor.execute(*sql)
	conn.commit()
def Get_chapter_id(chapter, manga_id):
	sql = "SELECT `chapter_id` FROM `chapter_manga` WHERE `manga_id`=%s AND `chapter_count`=%s"
	myCursor.execute(sql, (manga_id, chapter))
	result = myCursor.fetchone()
	if result == None:
		return 0
	else:
		return result[0]
def Is_manga_exist(manga_name):

	sql = "SELECT `id` FROM `mangas` WHERE `name`=%s"
	myCursor.execute(sql, (manga_name))
	result = myCursor.fetchone()
	if result == None:
		return 0
	else:
		return result[0]
for manga in mangaList: #manga name
	mangaLocalLink=os.path.join(mangapath, manga) 	#manga local link
	chapterList=os.listdir(mangaLocalLink)
	chapterList = [int(i) for i in chapterList]
	chapterList=sorted(chapterList)
	mangaID=Is_manga_exist(manga) #manga ID
	#print(mangaLocalLink)
	#print(chapterList)
	#print(mangaID)
	print("Inserting manga:" +manga)
	for chapter in chapterList:
	 	chapterLocalLink=os.path.join(mangaLocalLink, str(chapter))   #chapter local link
	 	# print(chapterLocalLink)
	 	imageList = os.listdir(chapterLocalLink)
	 	# InsertChapter(chapter,manga,mangaID)
	 	chapter_id=Get_chapter_id(chapter,mangaID)
	 	print("Inserting chapter:" +str(chapter))
	 	for image in imageList:
	 		InsertImage(chapter_id,manga,image, chapter)
conn.close()
