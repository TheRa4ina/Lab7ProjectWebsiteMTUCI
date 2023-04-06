from django.shortcuts import render
from articles.models import Article
from django.shortcuts import render
from django.http import Http404
from django.shortcuts import redirect
from django.contrib.auth.models import User
from django.contrib.auth import logout
from django.contrib.auth import authenticate
from django.contrib.auth import login

def login_view(request):
    if request.method == "POST":
        form={'name': request.POST["name"],'password': request.POST["password"]}
        user=authenticate(username=form['name'],password=form['password'])
        if(user==None):
            form["errors"] = u"Имя или пароль неправильны"
            return render(request, "login.html",{'form': form})
        else:
            login(request, user)
            return redirect('archive')
    else:
        return render(request,"login.html")

def logout_view(request):
    logout(request)
    return redirect('archive')

def get_article(request, article_id):
    try:
        post = Article.objects.get(id=article_id)
        return render(request, 'article.html', {"post": post})
    except Article.DoesNotExist:
        raise Http404

def archive(request):
    return render(request, 'archive.html', {"posts": Article.objects.all()})

def create_post(request):
    if not request.user.is_anonymous:
        if request.method == "POST":
        # обработать данные формы, если метод POST
            form = {
                'text': request.POST["text"], 'title': request.POST["title"]
            }
        # в словаре form будет храниться информация, введенная пользователем
            if form["text"] and form["title"]:
        # если поля заполнены без ошибок
                for i in Article.objects.all():
                    if ( i.title==form["title"]):
                        form["errors"] = u"Такая статья уже существует"
                        return render(request, "create_post.html",{'form': form})
                Article.objects.create(text=form["text"], title=form["title"], author=request.user)
                return redirect('get_article', article_id=Article.objects.last().id)
            # перейти на страницу поста
            else:
        # если введенные данные некорректны
                form['errors'] = u"Не все поля заполнены"
                return render(request, 'create_post.html', {'form': form})
        else:
        # просто вернуть страницу с формой, если метод GET
            return render(request, 'create_post.html', {})

    else:
        raise Http404
    
def create_user(request):
    if request.method =="POST":
        form = {
            'name': request.POST["name"],'mail': request.POST['mail'], 'password': request.POST['password']
        }
        if (form['name']=='' or form['mail']=='' or form['password']==''):
            form['errors']=u'Заполните все поля'
            return render(request, "register.html",{'form': form})
        try:
            User.objects.get(username=form['name'])
            form['errors']=u'Пользователь с таким именем уже существует'
            return render(request, "register.html",{'form': form})
        except User.DoesNotExist:
            User.objects.create_user(form['name'], form['mail'], form['password'])
            return redirect('archive')
            
    else:
        return render(request, 'register.html')


# Create your views here.
