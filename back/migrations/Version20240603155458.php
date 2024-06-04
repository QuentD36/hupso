<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240603155458 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE SEQUENCE booking_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE booking (
            id INT NOT NULL, 
            book_id INT NOT NULL, 
            email VARCHAR(255) NOT NULL, 
            start_date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, 
            end_date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, 
            status VARCHAR(255) NOT NULL, 
            PRIMARY KEY(id)
        )');
        $this->addSql('COMMENT ON COLUMN booking.start_date IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN booking.end_date IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('ALTER TABLE booking ADD CONSTRAINT FK_BOOKING_BOOK_ID FOREIGN KEY (book_id) REFERENCES book (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_BOOKING_BOOK_ID ON booking (book_id)');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE booking DROP CONSTRAINT FK_BOOKING_BOOK_ID');
        $this->addSql('DROP INDEX IDX_BOOKING_BOOK_ID');
        $this->addSql('DROP SEQUENCE booking_id_seq CASCADE');
        $this->addSql('DROP TABLE booking');
    }
}
