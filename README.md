# 한화에어로스페이스 최종프로젝트 - 방위산업 타겟 정보 분석 플랫폼

# 프로젝트 선정이유 

![Alt text](https://www.dropbox.com/scl/fi/uued58a5q1yrnhbmhw17w/.png?rlkey=0h5d62oiqt9xd2qs4uxsoh7i7&st=epjpmczc&raw=1)

# 프로젝트 개요 및 목적

![Alt text](https://www.dropbox.com/scl/fi/3z5zuy4y1ja31iomwrf9d/.png?rlkey=vfjy76clb7k89j2midsuv49gm&st=owp5fu0m&raw=1)

# 프로젝트 배경
![Alt text](https://www.dropbox.com/scl/fi/7czjpq6605lituxlxboe7/.png?rlkey=9vv1aq2k4wis61c88sitjtown&st=df643vwj&raw=1)

# 데이터 흐름도
![Alt text](https://www.dropbox.com/scl/fi/1fowl5caxob0p76ld4mee/.png?rlkey=xyh6uarlme6gorshh48lke94q&st=9v11s5lg&raw=1)


# 기대효과
![Alt text](https://www.dropbox.com/scl/fi/amljznbocf6m8wnlik414/.png?rlkey=qy6xnik8dgltsijqif59rvc1j&st=hqqc5hoh&raw=1)




# 데이터 분석
![Alt text](https://www.dropbox.com/scl/fi/bo3tncdq7ggkp6693yipp/1.png?rlkey=0h0p72z4vn5dfnnpdav9g1fzr&st=jip75y18&raw=1)

조사한 국가들을 대상으로 경제, 정치 거버넌스 지표, 분쟁도 지표를 가지고 점수화를 시켜보았습니다.
- 경제 지표로 점수를 낼 때는 GDP, 군사력 비용 등 9개의 지표를 사용하여 점수화를 시켜보았고,
- 정치 거버넌스 지표는 원 데이터의 6가지 지표에 대해 동등한 가중치로 점수를 매겨보았습니다. 
- 분쟁도 점수는 분쟁의 최대사망자 기준으로 나라별로 합을 구한 후 분쟁이 없는 나라는 100점, 분쟁이 있는 나라는 사망자의 역순을 기준으로 99-1점을 매겼습니다.

각 지표의 변수는 1991년 데이터부터 2020년 데이터까지의 데이터를 모두 수집한 후 사이클로이드 곡선을 통해 최근 데이터가 가중치가 더 많이 나타나도록 가중치를 주어 수치화시켰습니다. 그 후 그 변수들을 가지고 점수화를 진행하였습니다.

![Alt text](https://www.dropbox.com/scl/fi/2tfligjp3sy3xo5okj1gn/2.png?rlkey=566tor2t257mpmxubj2xx090w&st=acx779v8&raw=1)
![Alt text](https://www.dropbox.com/scl/fi/wase3hs2zlsb5vq58ze04/3.png?rlkey=wbe3c09op9nzhyb825ll3nf5v&st=50zebf1o&raw=1)
이후 이 3개의 점수에 동일한 가중치를 주어 군집화를 진행해보았고, 군집을 기준으로 나라의 등급을 A, B, C로 매겨보았습니다.
![Alt text](https://www.dropbox.com/scl/fi/nq74b4jzcrerv1j1qd2o5/4.png?rlkey=le8xtstd8v9f368e19iojyfdd&st=1xmqbk5w&raw=1)
![Alt text](https://www.dropbox.com/scl/fi/2wg0ub4q3ffx1ll3gbojy/5.png?rlkey=ushlrs6u191hcbzd19ih6nvy0&st=i68691vd&raw=1)
![Alt text](https://www.dropbox.com/scl/fi/0vmzcwlrb2iqm09shdtdg/6.png?rlkey=jfhazk3ttqnvnlqq1gkq1pbra&st=4z6aqo0s&raw=1)
무기 체계는 미국 방위사업청 출처를 기준으로 카테고리화를 시켜보았습니다. 
- 해당 카테고리를 기준으로 보유 현황을 수입양으로 나눠 해당 나라가 어떤 무기체계에 대해 얼마나 수입에 의존하는지를 나타내보았습니다
- 한 나라가 어느 무기 체계에서 수입이 많은지를 나타내보았습니다.
- 해당 그래프 옆에 저희가 구했던 경제, 정치, 분쟁도 점수와 국가 등급, GDP를 같이 나타내보았습니다.


# 플랫폼 구현

![Alt text](https://www.dropbox.com/scl/fi/nt13cx63tame948ujhu47/1.png?rlkey=lzza17q84hhalsap1ue11v5ve&st=954c3mam&raw=1)
![Alt text](https://www.dropbox.com/scl/fi/9vq42msjjdypgfcbz7q3e/2.png?rlkey=pxfv10x13zul1s9n51hsaw40v&st=0fb8pc8e&raw=1)
![Alt text](https://www.dropbox.com/scl/fi/l1kxklhlgdv2o9lr3hwu7/3.png?rlkey=gocv4uk7m4icus5ig6e5wi69t&st=5mra0wqu&raw=1)



