import os
mangapath = 'Mangas'
mangaList = os.listdir(mangapath)
for manga in mangaList:
	 mangaLocalLink=os.path.join(mangapath, manga) 	#manga local link
	 chapterList=os.listdir(mangaLocalLink)
	 chapterList = [int(i) for i in chapterList]
	 chapterList=sorted(chapterList)
	 #print(mangaLocalLink)
	 #print(chapterList)
	 for chapter in chapterList:
	 	chapterLocalLink=os.path.join(mangaLocalLink, str(chapter))   #chapter local link
	 	#print(chapterLocalLink)
	 	imageList = os.listdir(chapterLocalLink)
	 	for image in imageList:
	 		imageLocalLink=os.path.join(chapterLocalLink, image)
	 		chapterNumber=(''.join(filter(str.isdigit, image)))
	 		new=os.path.join(chapterLocalLink, chapterNumber+'.jpg')
	 		os.replace(imageLocalLink, new)
	 		# print(imageLocalLink)
# for root, dirs, files in os.walk(yourpath, topdown=False):
#     for name in dirs:
#         print(os.path.join(root, name))
