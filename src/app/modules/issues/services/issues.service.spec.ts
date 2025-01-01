import { TestBed } from "@angular/core/testing"
import { IssuesService } from "./issues.service"
import { provideQueryClient, QueryClient } from "@tanstack/angular-query-experimental"
import { State } from "../interfaces"

describe('IssuesService', () => {
  let service: IssuesService

  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000; // Increase timeout interval
    TestBed.configureTestingModule({
      providers: [provideQueryClient(new QueryClient())],
    })
    service = TestBed.inject(IssuesService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('shoudl load labels', async () => {
    const { data } = await service.labelsQuery.refetch();
    expect(data?.length).toBe(30)

    const [label] = data!;

    expect(typeof label.id).toBe('number')
    expect(typeof label.node_id).toBe('string')
    expect(typeof label.url).toBe('string')
    expect(typeof label.name).toBe('string')
    expect(typeof label.color).toBe('string')
    expect(typeof label.default).toBe('boolean')
    expect(typeof label.description).toBe('string')
  })

  it('should set selected state, OPEN, CLOSED', async () => {
    service.showIssuesByState(State.Closed)
    expect(service.selectedState()).toBe(State.Closed)

    const { data } = await service.issuesQuery.refetch();

    data?.forEach(issue => {
      expect(issue.state).toBe(State.Closed)
    })

    service.showIssuesByState(State.Open)
    expect(service.selectedState()).toBe(State.Open)

    const { data: open } = await service.issuesQuery.refetch();

    open?.forEach(issue => {
      expect(issue.state).toBe(State.Open)
    })
  })
})
