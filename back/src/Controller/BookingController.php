<?php

namespace App\Controller;

use App\Entity\Booking;
use App\Repository\BookingRepository;
use App\Repository\BookRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

class BookingController extends AbstractController
{
    private $bookingRepository;
    private $bookRepository;


    public function __construct(BookingRepository $bookingRepository, BookRepository $bookRepository)
    {
        $this->bookingRepository = $bookingRepository;
        $this->bookRepository = $bookRepository;
    }

    #[Route('/booking', name: 'booking', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        /**
         * Here we should validate the date but for test only we will just assume it is valid 
         */
        $book = $this->bookRepository->find($data['book']);

        if (!$book) {
            return new JsonResponse(['message' => 'Book not found'], 404);
        }

        $booking = new Booking();
        $booking->setBook($book);
        $booking->setEmail($data['email']);
        $booking->setStartDate(new \DateTimeImmutable($data['startDate']));
        $booking->setEndDate(new \DateTimeImmutable($data['endDate']));
        $booking->setStatus('active');

        $this->bookingRepository->save($booking, true);

        return new JsonResponse($booking, 200, []);
    }
}
