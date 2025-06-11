from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.core.mail import send_mail
from .forms import ContactForm
from .models import Comment
from django.contrib import messages
from .models import ContactMessage

def post_comment(request):
    if request.method == 'POST':
        message = request.POST.get('message')
        uploaded_file = request.FILES.get('file')  # Get file if present

        Comment.objects.create(message=message, file=uploaded_file)
    return redirect('comments_page')

def comments_page(request):
    comments = Comment.objects.all().order_by('-timestamp')
    return render(request, 'culture/index.html', {'comments': comments})

def home(request):
    return render(request, 'culture/index.html')

# def contact(request):
#     return render(request, 'culture/contact.html')

def cuisine(request):
    return render(request, 'culture/cuisine.html')

def festivals(request):
    return render(request, 'culture/festivals.html')

def art_craft(request):
    return render(request, 'culture/art-craft.html')

def music_dance(request):
    return render(request, 'culture/music-dance.html')

def culture_page(request):  # to avoid conflict with app name
    return render(request, 'culture/culture.html')

def contact(request):
    form = ContactForm()
    name = email = message = None

    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            # Process form data
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            message = form.cleaned_data['message']
            
            ContactMessage.objects.create(
                name=name,
                email=email,
                message=message
            )

            messages.success(request, "Message sent successfully!")
            
            return redirect('contact')  # Redirect to the same page to show message
        # else:  
        #     form = ContactForm()

    return render(request, 'culture/contact.html', {
        'form': form,
        'name': name,
        'email': email,
        'message': message
        })

