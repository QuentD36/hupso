<?php

namespace App\Controller;

use App\Repository\BookRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

class BookController extends AbstractController
{
    private $bookRepository;
    private $serializer;

    public function __construct(BookRepository $bookRepository, SerializerInterface $serializer)
    {
        $this->bookRepository = $bookRepository;
        $this->serializer = $serializer;
    }

    #[Route('/books', name: 'books')]
    public function index(Request $request): JsonResponse
    {
        $search = $request->query->get('search');
        $category = $request->query->get('category');
        $year = $request->query->get('year');

        $books = $this->bookRepository->findAllWithFilters($search, $category, $year);

        $jsonBooks = $this->serializer->serialize($books, 'json', ['groups' => ['book']]);

        return new JsonResponse($jsonBooks, 200, [], true);
    }

    #[Route('/books/{id}', name: 'book')]
    public function show(int $id): JsonResponse
    {
        $book = $this->bookRepository->find($id);
        $jsonBook = $this->serializer->serialize($book, 'json');

        return new JsonResponse($jsonBook, 200, [], true);
    }
}
