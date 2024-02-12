package bookGenerator._global.event;

import lombok.NoArgsConstructor;

import bookGenerator._global.eventBase.EventNameAnnotation;
import bookGenerator._global.eventBase.BookShelfBookEvent;
import bookGenerator.domain.BookShelfBook;

@NoArgsConstructor
@EventNameAnnotation(eventName="BookShelfBookDeleted")
public class BookShelfBookDeleted extends BookShelfBookEvent {
    public BookShelfBookDeleted(BookShelfBook aggregate) {
        super(aggregate);
    }
}
